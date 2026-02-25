# Catalyst Connector: Mistral AI
European AI models from Mistral — multilingual, GDPR-friendly

## About Mistral AI

Mistral AI is a French AI company building efficient, multilingual language models. Headquartered in Paris, Mistral offers EU data sovereignty and GDPR-friendly processing. Their models excel at European languages and offer strong performance at competitive pricing. Codestral is their specialised coding model.

## Quick Start

1. Apply the **Catalyst - Mistral AI** template to any Service Task
2. Set your API key (or secret reference)
3. Edit the Request Payload for your use case
4. Deploy and run

## Authentication

| Setting | Value |
|---------|-------|
| Auth Type | `bearerToken` |
| Auth Header | `Authorization` |
| Auth Prefix | `Bearer` |
| Console | [console.mistral.ai](https://console.mistral.ai) |
| Key Prefix | `...` |
| Default Secret Name | `mistral_api_key` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `mistral_api_key` → env `MISTRAL_API_KEY` |
| Docker Secret File | `file` | Reads `/run/secrets/mistral_api_key` |
| Properties File | `properties` | Key `mistral_api_key` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Request Payload (Default)

```json
{
  "model": "mistral-small-latest",
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
| `mistral-small-latest` | Fast, affordable (default) |
| `mistral-medium-latest` | Balanced |
| `mistral-large-latest` | Most capable |
| `codestral-latest` | Specialised for code |
| `open-mistral-nemo` | Open-weight, 128K context |


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
| `aiReply` | `choices[0].message.content` | Mistral's response text |
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
| 401 | `AUTH_FAILED` | Invalid API key | Check key at console.mistral.ai |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff |
| 400 | `INVALID_REQUEST` | Malformed request | Check payload JSON |


## Example Process

```
[Start] → [User Task: Configure] → [Service Task: Ask Mistral AI] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

## Tips

- **EU-based**
- **Strong multilingual support**
- **Codestral is a dedicated coding model**
- **OpenAI-compatible API**

## Files

| File | Description |
|------|-------------|
| `mistral.element.json` | Element Template |
| `mistral-example.bpmn` | Example BPMN process |
| `mistral.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
