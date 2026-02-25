# Catalyst Connector: Webhook
Send a JSON POST to any webhook URL — notify external systems, trigger pipelines, fire events

## About Webhooks

A webhook is a way for one system to notify another that something happened. Instead of polling an API for changes, you push an event to a URL. This connector sends an HTTP POST with a JSON payload to any webhook endpoint.

Use this to:
- Notify external systems when a process reaches a milestone
- Trigger CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins)
- Send events to monitoring tools (PagerDuty, Datadog, Opsgenie)
- Push data to automation platforms (Zapier, Make, n8n)
- Fire custom notifications to internal microservices
- Log process events to an external system

This is the "fire and forget" outbound connector. For full request/response control (GET, PUT, DELETE, custom response mapping), use the **Generic REST** connector instead.

## Quick Start

1. Apply the **Catalyst - Webhook** template to any Service Task
2. Set the **Webhook URL** — the endpoint to POST to
3. Edit the **JSON Payload** — the data to send
4. Deploy and run

For testing, use [webhook.site](https://webhook.site) — it gives you a free URL that shows incoming requests in real time.

## Authentication

Most webhooks need no auth. The template defaults to `none`.

If the receiving system expects a shared secret:

| Setting | Example Value | Description |
|---------|---------------|-------------|
| Auth Type | `apiKeyHeader` | Send a secret in a header |
| Auth Header Name | `X-Webhook-Secret` | The header name the receiver checks |
| Auth Prefix | `NONE` | Bare secret (no prefix) |
| Secret Source | `env` | Resolve from environment variable |
| Webhook Secret | `my_webhook_secret` | Secret name → env `MY_WEBHOOK_SECRET` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Process Variable (dev) | `variable` | Literal value (or `not_required`) |
| Environment Variable | `env` | `my_webhook_secret` → env `MY_WEBHOOK_SECRET` |
| Docker Secret File | `file` | Reads `/run/secrets/my_webhook_secret` |
| Properties File | `properties` | Key `my_webhook_secret` in `catalyst-secrets.properties` |

## Template Fields

### Visible Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Auth Type | Dropdown | `none` | `none`, `apiKeyHeader` |
| Auth Header Name | String | `X-Webhook-Secret` | Header for the secret |
| Auth Prefix | String | `NONE` | Prefix before secret value |
| Secret Source | Dropdown | `variable` | Where to resolve the secret |
| Webhook Secret | String | `not_required` | Secret name or literal |
| Webhook URL | String | `https://example.com/webhook` | Target URL |
| Extra Headers | Text | `{}` | Additional headers as JSON |
| JSON Payload | Text | *(see below)* | JSON body to POST |
| Response Mapping | Text | `{}` | Map response to variables |
| Error Mapping | Text | *(see below)* | HTTP → BPMN error codes |
| Timeout (seconds) | String | `10` | Max wait time |

### Hidden Fields (pre-configured)

| Field | Value | Description |
|-------|-------|-------------|
| HTTP Method | `POST` | Always POST for webhooks |
| Retry on 429 | `true` | Auto-retry on rate limit |
| Max Retries | `3` | Retry attempts |

## JSON Payload

Default payload:

```json
{
  "event": "process.completed",
  "processId": "${execution.processInstanceId}",
  "message": "${userMessage}",
  "timestamp": "${now()}"
}
```

### What to edit

| Field | Description |
|-------|-------------|
| `event` | An event name the receiver can use to route/filter |
| `processId` | Camunda process instance ID for correlation |
| `message` | Any process variable via `${variableName}` |
| `timestamp` | Use `${now()}` for current time |

### Common payload patterns

**Simple notification:**
```json
{
  "event": "order.approved",
  "orderId": "${orderId}",
  "approvedBy": "${approver}"
}
```

**CI/CD trigger:**
```json
{
  "ref": "main",
  "inputs": {
    "environment": "${targetEnv}",
    "version": "${buildVersion}"
  }
}
```

**Monitoring alert:**
```json
{
  "severity": "warning",
  "service": "order-processing",
  "message": "SLA breach: order ${orderId} exceeded processing time",
  "processId": "${execution.processInstanceId}"
}
```

## Response Mapping

Default: `{}` (empty — most webhooks return minimal data).

Most webhooks return `200 OK` with an empty body or a simple acknowledgement. Use `catalyst_success` and `catalyst_statusCode` to verify delivery.

If the webhook does return useful data, map it:
```json
{
  "webhookId": "id",
  "status": "status"
}
```

### Standard Variables (always set by the JAR)

| Variable | Type | Description |
|----------|------|-------------|
| `catalyst_responseBody` | String | Full response body |
| `catalyst_statusCode` | Integer | HTTP status code |
| `catalyst_success` | Boolean | `true` if 2xx response |
| `catalyst_error` | String | Error message on failure |

## Error Handling

```json
{
  "429": "RATE_LIMITED",
  "401": "AUTH_FAILED",
  "404": "ENDPOINT_NOT_FOUND",
  "500": "SERVER_ERROR"
}
```

| HTTP Status | BPMN Error | Cause | Action |
|-------------|------------|-------|--------|
| 401 | `AUTH_FAILED` | Invalid or missing secret | Check webhook secret |
| 404 | `ENDPOINT_NOT_FOUND` | URL doesn't exist | Check webhook URL |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff |
| 500 | `SERVER_ERROR` | Receiver error | Check the receiving system |

## Example Process

The example uses a user-provided webhook URL (get a free test URL from [webhook.site](https://webhook.site)):

```
[Start] → [User Task: Configure] → [Service Task: Fire Webhook] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

1. **Configure Webhook** — Enter the webhook URL and a message
2. **Fire Webhook** — POSTs JSON to the URL with no auth
3. **Review Results** — Shows success/failure status

## Tips

- **Test with webhook.site** — get a free URL, see incoming requests in real time. Perfect for development.
- **Timeout is 10s** — webhooks should respond fast. If the receiver does heavy processing, it should accept the webhook quickly and process asynchronously.
- **Check `catalyst_success`** — the most important output. If `true`, the webhook was delivered.
- **No response mapping needed** for fire-and-forget. The default empty `{}` is intentional.
- **For idempotency**, include a unique ID in the payload (like `${execution.processInstanceId}`) so the receiver can deduplicate.
- **To trigger GitHub Actions**, POST to `https://api.github.com/repos/{owner}/{repo}/dispatches` with a `repository_dispatch` event and a Bearer token.

## Webhook vs Generic REST

| | Webhook | Generic REST |
|---|---------|-------------|
| **Purpose** | Notify / fire event | Full API interaction |
| **Method** | Always POST | Any (GET/POST/PUT/DELETE/PATCH) |
| **Auth default** | None | apiKeyHeader |
| **Response mapping** | Usually empty | Full mapping |
| **Timeout** | 10s | 30s |
| **Use when** | Pushing events out | Calling APIs that return data |

## Files

| File | Description |
|------|-------------|
| `webhook.element.json` | Element Template |
| `webhook-example.bpmn` | Example BPMN process |
| `webhook.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
