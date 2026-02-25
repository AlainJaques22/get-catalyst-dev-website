# Catalyst Connector: Fireworks AI
High-performance AI inference with Fireworks' proprietary FireAttention engine

## About Fireworks AI

Fireworks AI is a high-performance inference platform with a proprietary FireAttention engine delivering up to 50% faster speed and 250% higher throughput than standard GPU serving. They host popular open models and offer fine-tuning, batch processing, and on-demand GPU access.

## Quick Start

1. Apply the **Catalyst - Fireworks AI** template to any Service Task
2. Set your API key (or secret reference)
3. Edit the Request Payload for your use case
4. Deploy and run

## Authentication

| Setting | Value |
|---------|-------|
| Auth Type | `bearerToken` |
| Auth Header | `Authorization` |
| Auth Prefix | `Bearer` |
| Console | [fireworks.ai](https://fireworks.ai/api-keys) |
| Key Prefix | `fw_...` |
| Default Secret Name | `fireworks_api_key` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `fireworks_api_key` → env `FIREWORKS_API_KEY` |
| Docker Secret File | `file` | Reads `/run/secrets/fireworks_api_key` |
| Properties File | `properties` | Key `fireworks_api_key` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Request Payload (Default)

```json
{
  "model": "accounts/fireworks/models/llama-v3p3-70b-instruct",
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
| `accounts/fireworks/models/llama-v3p3-70b-instruct` | Llama 3.3 70B (default) |
| `accounts/fireworks/models/deepseek-r1` | DeepSeek R1 — reasoning |
| `accounts/fireworks/models/mixtral-8x22b-instruct` | Mixtral 8x22B |


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
| 401 | `AUTH_FAILED` | Invalid API key | Check key at fireworks.ai |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff |
| 400 | `INVALID_REQUEST` | Malformed request | Check model path format |


## Example Process

```
[Start] → [User Task: Configure] → [Service Task: Ask Fireworks AI] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

## Tips

- Model names use path format: accounts/fireworks/models/llama-v3p3-70b-instruct
- FireAttention engine delivers noticeably faster inference than competitors.
- Supports LoRA fine-tuning and batch processing for production workloads.
- Free credits on signup.

## Files

| File | Description |
|------|-------------|
| `fireworks-ai.element.json` | Element Template |
| `fireworks-ai-example.bpmn` | Example BPMN process |
| `fireworks-ai.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
