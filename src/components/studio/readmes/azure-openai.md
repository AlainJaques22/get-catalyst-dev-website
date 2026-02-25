# Catalyst Connector: Azure OpenAI
Send chat completions to Azure-hosted OpenAI models

## About Azure OpenAI

Azure OpenAI provides enterprise access to OpenAI models hosted on Microsoft Azure infrastructure. It offers the same GPT models as OpenAI but with Azure's enterprise security, compliance, private networking, and regional data residency. Auth uses a custom `api-key` header (not Bearer token), and the model is specified in the deployment URL rather than the request body.

## Quick Start

1. Apply the **Catalyst - Azure OpenAI** template to any Service Task
2. Set your API key (or secret reference)
3. Edit the Request Payload for your use case
4. Deploy and run

## Authentication

| Setting | Value |
|---------|-------|
| Auth Type | `apiKeyHeader` |
| Auth Header | `api-key` |
| Auth Prefix | `NONE` |
| Console | [portal.azure.com](https://portal.azure.com) |
| Key Prefix | `abc123...` |
| Default Secret Name | `azure_openai_api_key` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `azure_openai_api_key` → env `AZURE_OPENAI_API_KEY` |
| Docker Secret File | `file` | Reads `/run/secrets/azure_openai_api_key` |
| Properties File | `properties` | Key `azure_openai_api_key` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Request Payload (Default)

```json
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "${userMessage}"}
  ],
  "max_tokens": 1024
}
```

## Available Models

| Model | Description |
|-------|-------------|
| `gpt-4o` | Most capable (set via deployment name) |
| `gpt-4o-mini` | Fast and affordable (set via deployment name) |


## Response Mapping (Default)

```json
{
  "aiReply": "choices[0].message.content",
  "modelUsed": "model",
  "promptTokens": "usage.prompt_tokens",
  "completionTokens": "usage.completion_tokens",
  "finishReason": "choices[0].finish_reason"
}
```

| Variable | JSON Path | Description |
|----------|-----------|-------------|
| `aiReply` | `choices[0].message.content` | The assistant's response text |
| `modelUsed` | `model` | Model that generated the response |
| `promptTokens` | `usage.prompt_tokens` | Tokens in the prompt |
| `completionTokens` | `usage.completion_tokens` | Tokens in the response |
| `finishReason` | `choices[0].finish_reason` | Why generation stopped |


### Standard Variables (always set by the JAR)

| Variable | Type | Description |
|----------|------|-------------|
| `catalyst_responseBody` | String | Full JSON response body |
| `catalyst_statusCode` | Integer | HTTP status code |
| `catalyst_success` | Boolean | `true` if 2xx response |
| `catalyst_error` | String | Error message on failure |

## Error Handling

```json
{
  "429": "RATE_LIMITED",
  "401": "AUTH_FAILED",
  "400": "INVALID_REQUEST",
  "404": "DEPLOYMENT_NOT_FOUND"
}
```

| HTTP Status | BPMN Error | Cause | Action |
|-------------|------------|-------|--------|
| 401 | `AUTH_FAILED` | Invalid API key | Check key in Azure Portal |
| 404 | `DEPLOYMENT_NOT_FOUND` | Deployment doesn't exist | Check deployment name in URL |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff |
| 400 | `INVALID_REQUEST` | Malformed request | Check payload JSON |


## Example Process

```
[Start] → [User Task: Configure] → [Service Task: Ask Azure OpenAI] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

## Tips

- **You MUST replace YOUR-RESOURCE and YOUR-DEPLOYMENT in the URL**
- **The model is determined by your Azure deployment, not the payload**
- **Auth uses the `api-key` header with a bare key (no Bearer prefix)**
- Error 404 usually means the deployment name in the URL is wrong.

## Files

| File | Description |
|------|-------------|
| `azure-openai.element.json` | Element Template |
| `azure-openai-example.bpmn` | Example BPMN process |
| `azure-openai.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
