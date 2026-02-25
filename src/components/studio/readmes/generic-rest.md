# Catalyst Connector: Generic REST
Connect to any REST API — configure URL, method, auth, and payload yourself

## About Generic REST

This is the universal connector. If Catalyst doesn't have a dedicated connector for the API you need, the Generic REST connector lets you configure everything manually: endpoint URL, HTTP method, authentication, headers, request payload, and response mapping.

Every field is visible and editable. Nothing is hidden or pre-configured. You have full control over every aspect of the HTTP request.

Use this when:
- There's no dedicated Catalyst connector for your API
- You're integrating with an internal/private API
- You need a quick one-off API call without building a custom connector
- You want to prototype a new integration before requesting a dedicated connector

## Quick Start

1. Apply the **Catalyst - Generic REST** template to any Service Task
2. Set the **API Endpoint URL** to your target API
3. Choose the **HTTP Method** (GET, POST, PUT, DELETE, PATCH)
4. Configure **authentication** (type, header, credential)
5. Set the **Request Payload** (for POST/PUT/PATCH)
6. Define the **Response Mapping** to extract fields into process variables
7. Deploy and run

## Authentication

All auth settings are visible and configurable:

| Setting | Description |
|---------|-------------|
| **Auth Type** | Dropdown: `apiKeyHeader`, `basicAuth`, `apiKeyQuery`, `none` |
| **Auth Header Name** | The header to put the credential in (e.g. `Authorization`, `x-api-key`) |
| **Auth Prefix** | Prefix before the key (e.g. `Bearer`, `NONE` for bare key) |
| **Secret Source** | Where to resolve the credential from |
| **Credential / API Key** | The secret name or literal value |

### Auth Type Guide

| Your API Uses... | Set Auth Type | Set Header | Set Prefix |
|------------------|---------------|------------|------------|
| `Authorization: Bearer sk-abc123` | `apiKeyHeader` | `Authorization` | `Bearer` |
| `x-api-key: abc123` (bare key) | `apiKeyHeader` | `x-api-key` | `NONE` |
| `api-key: abc123` (Azure-style) | `apiKeyHeader` | `api-key` | `NONE` |
| Basic Auth (user:pass) | `basicAuth` | *(ignored)* | *(ignored)* |
| `?api_key=abc123` (query param) | `apiKeyQuery` | *(ignored)* | *(ignored)* |
| No auth needed | `none` | *(ignored)* | *(ignored)* |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `my_api_key` → env `MY_API_KEY` |
| Docker Secret File | `file` | Reads `/run/secrets/my_api_key` |
| Properties File | `properties` | Key `my_api_key` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Template Fields

**Everything is visible** — the Generic REST connector has no hidden fields (except the JAR class reference and retry settings).

### Authentication Group

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Auth Type | Dropdown | `apiKeyHeader` | Auth strategy |
| Auth Header Name | String | `Authorization` | Header name for credential |
| Auth Prefix | String | `Bearer` | Prefix before key value |
| Secret Source | Dropdown | `env` | Where credential is resolved from |
| Credential / API Key | String | `my_api_key` | Secret name or literal value |

### Request Configuration Group

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| API Endpoint URL | String | `https://api.example.com/v1/resource` | Full URL of the endpoint |
| HTTP Method | Dropdown | `POST` | GET, POST, PUT, DELETE, PATCH |
| Extra Headers | Text | `{}` | Additional headers as JSON |
| Query Parameters | Text | `{}` | URL query params as JSON |
| Request Payload | Text | `{"key": "value"}` | JSON request body |

### Response Mapping Group

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Response Mapping | Text | `{"result": "data"}` | Maps response fields to variables |
| Error Mapping | Text | `{"429": "RATE_LIMITED", ...}` | Maps HTTP codes to BPMN errors |

### Connection Group

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Timeout (seconds) | String | `30` | Max wait time |

## Request Payload

The default payload is a placeholder:

```json
{
  "key": "value",
  "message": "${processVariable}"
}
```

Replace this with whatever your target API expects. Use `${variableName}` for Camunda process variable interpolation.

For **GET** requests, clear the payload field (leave it empty).

## Response Mapping

The default mapping is a placeholder:

```json
{
  "result": "data",
  "status": "status"
}
```

Replace with the actual JSON paths from your API's response. Use dot-notation and array indexing:

| Syntax | Example | What It Extracts |
|--------|---------|-----------------|
| `field` | `status` | Top-level field |
| `parent.child` | `data.name` | Nested field |
| `array[0]` | `items[0]` | First array element |
| `array[0].field` | `results[0].id` | Field from array element |

### Standard Variables (always set by the JAR)

| Variable | Type | Description |
|----------|------|-------------|
| `catalyst_responseBody` | String | Full JSON response body |
| `catalyst_statusCode` | Integer | HTTP status code |
| `catalyst_success` | Boolean | `true` if 2xx response |
| `catalyst_error` | String | Error message on failure |

## Error Handling

Default error mapping covers the most common HTTP status codes:

```json
{
  "429": "RATE_LIMITED",
  "401": "AUTH_FAILED",
  "403": "FORBIDDEN",
  "404": "NOT_FOUND",
  "400": "BAD_REQUEST",
  "500": "SERVER_ERROR"
}
```

| HTTP Status | BPMN Error | Cause | Action |
|-------------|------------|-------|--------|
| 401 | `AUTH_FAILED` | Invalid credential | Check your API key / token |
| 403 | `FORBIDDEN` | Insufficient permissions | Check API key scopes |
| 404 | `NOT_FOUND` | Resource doesn't exist | Check URL |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff |
| 400 | `BAD_REQUEST` | Malformed request | Check payload and headers |
| 500 | `SERVER_ERROR` | Server error | Retry later |

Add or remove error codes to match your API. Use the BPMN error codes in boundary error events to handle specific failures.

## Example Process

The example uses the free [JSONPlaceholder](https://jsonplaceholder.typicode.com) API — no auth needed:

```
[Start] → [User Task: Configure] → [Service Task: Call REST API] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

1. **Configure Request** — Enter the URL (default: `https://jsonplaceholder.typicode.com/posts/1`)
2. **Call REST API** — GET request with no auth, maps `title`, `body`, `userId` from response
3. **Review Results** — Displays the extracted fields

## Tips

- **Start with the example** — the JSONPlaceholder API needs no auth, so you can verify the connector works before adding your own API.
- **For GET requests**, clear the Request Payload field entirely.
- **Content-Type is auto-set** by the JAR when a payload is present — you don't need to add it to Extra Headers.
- **Check `catalyst_responseBody`** in the Review task to see the raw API response — useful for figuring out the right JSON paths for your response mapping.
- **Query Parameters** are appended to the URL — use them instead of manually building query strings in the URL.
- **For basicAuth**, the credential value should be `username:password` — the JAR Base64-encodes it automatically.
- **For apiKeyQuery**, the key is added as a `?api_key=value` query parameter — the param name defaults to `api_key`.

## Common Recipes

### GET with Bearer Token
- Method: `GET`
- Auth Type: `apiKeyHeader`
- Auth Header: `Authorization`
- Auth Prefix: `Bearer`
- Payload: *(empty)*

### POST with API Key in Custom Header
- Method: `POST`
- Auth Type: `apiKeyHeader`
- Auth Header: `x-api-key`
- Auth Prefix: `NONE`
- Payload: `{"your": "json"}`

### POST with Basic Auth
- Method: `POST`
- Auth Type: `basicAuth`
- Credential: `username:password` (or secret name resolving to this)
- Payload: `{"your": "json"}`

### GET with No Auth (Public API)
- Method: `GET`
- Auth Type: `none`
- Secret Source: `variable`
- Credential: `not_required`
- Payload: *(empty)*

## Files

| File | Description |
|------|-------------|
| `generic-rest.element.json` | Element Template |
| `generic-rest-example.bpmn` | Example BPMN process |
| `generic-rest.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
