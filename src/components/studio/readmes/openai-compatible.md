# Catalyst Connector: OpenAI-Compatible
Connect to any OpenAI-compatible API endpoint — universal fallback connector

## About OpenAI-Compatible

This is the universal fallback connector for any API that speaks the OpenAI chat completions format. If your provider isn't listed as a dedicated connector, use this one. You'll need to edit the URL, model name, and auth settings to match your provider. Works with vLLM, LM Studio, LiteLLM, OpenRouter, and any other OpenAI-compatible endpoint.

## Quick Start

1. Apply the **Catalyst - OpenAI-Compatible** template to any Service Task
2. Set your API key (or secret reference)
3. Edit the Request Payload for your use case
4. Deploy and run

## Authentication

| Setting | Value |
|---------|-------|
| Auth Type | `bearerToken` |
| Auth Header | `Authorization` |
| Auth Prefix | `Bearer` |
| Console | [See provider docs](https://catalyst-connector.com/docs/openai-compatible) |
| Key Prefix | `...` |
| Default Secret Name | `compatible_api_key` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `compatible_api_key` → env `COMPATIBLE_API_KEY` |
| Docker Secret File | `file` | Reads `/run/secrets/compatible_api_key` |
| Properties File | `properties` | Key `compatible_api_key` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Request Payload (Default)

```json
{
  "model": "llama3.2",
  "max_tokens": 1024,
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "${userMessage}"}
  ]
}
```

## Available Models

| Model | Description |
|-------|-------------|
| `(varies by provider)` | Check your provider's model list |


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
| `aiReply` | `choices[0].message.content` | The model's response text |
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
  "400": "INVALID_REQUEST"
}
```

| HTTP Status | BPMN Error | Cause | Action |
|-------------|------------|-------|--------|
| 401 | `AUTH_FAILED` | Invalid API key | Check your provider's console |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff |
| 400 | `INVALID_REQUEST` | Malformed request | Check payload and model name |


## Example Process

```
[Start] → [User Task: Configure] → [Service Task: Ask OpenAI-Compatible] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

## Tips

- You MUST edit the URL to point to your provider's endpoint.
- Edit the model name in the payload to match your provider.
- For providers with no auth (local models), set Secret Source to 'Process Variable'.
- **This is the catch-all**

## Files

| File | Description |
|------|-------------|
| `openai-compatible.element.json` | Element Template |
| `openai-compatible-example.bpmn` | Example BPMN process |
| `openai-compatible.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
