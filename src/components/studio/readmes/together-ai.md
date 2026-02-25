# Catalyst Connector: Together AI
Access 200+ open-source models through Together AI's fast inference platform

## About Together AI

Together AI hosts 200+ open-source models with OpenAI-compatible APIs. They offer fast serverless inference, fine-tuning, and dedicated deployments. Great for running DeepSeek, Llama, Qwen, and Mixtral on US infrastructure with competitive pricing.

## Quick Start

1. Apply the **Catalyst - Together AI** template to any Service Task
2. Set your API key (or secret reference)
3. Edit the Request Payload for your use case
4. Deploy and run

## Authentication

| Setting | Value |
|---------|-------|
| Auth Type | `bearerToken` |
| Auth Header | `Authorization` |
| Auth Prefix | `Bearer` |
| Console | [api.together.ai](https://api.together.ai) |
| Key Prefix | `...` |
| Default Secret Name | `together_api_key` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `together_api_key` → env `TOGETHER_API_KEY` |
| Docker Secret File | `file` | Reads `/run/secrets/together_api_key` |
| Properties File | `properties` | Key `together_api_key` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Request Payload (Default)

```json
{
  "model": "meta-llama/Llama-3.3-70B-Instruct-Turbo",
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
| `meta-llama/Llama-3.3-70B-Instruct-Turbo` | Llama 3.3 70B Turbo (default) |
| `deepseek-ai/DeepSeek-R1` | DeepSeek R1 — reasoning (US-hosted) |
| `Qwen/Qwen2.5-72B-Instruct-Turbo` | Qwen 2.5 72B — multilingual |
| `mistralai/Mixtral-8x22B-Instruct-v0.1` | Mixtral 8x22B — mixture of experts |


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
| 401 | `AUTH_FAILED` | Invalid API key | Check key at api.together.ai |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff |
| 400 | `INVALID_REQUEST` | Malformed request | Check model name — Together uses org/model format |


## Example Process

```
[Start] → [User Task: Configure] → [Service Task: Ask Together AI] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

## Tips

- Model names use org/model format: meta-llama/Llama-3.3-70B-Instruct-Turbo
- Good option for running DeepSeek R1 on US infrastructure (data residency).
- Free credits on signup for development.
- Often cheaper than the original provider's API.

## Files

| File | Description |
|------|-------------|
| `together-ai.element.json` | Element Template |
| `together-ai-example.bpmn` | Example BPMN process |
| `together-ai.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
