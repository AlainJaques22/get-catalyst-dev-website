# Catalyst Connector: Groq
Ultra-fast AI inference on Groq LPU hardware — 500+ tokens/sec

## About Groq

Groq builds custom LPU (Language Processing Unit) chips designed specifically for AI inference. The result is the fastest inference available — often 10-20x faster than GPU-based alternatives. Not to be confused with Grok (xAI/Elon Musk's model). Groq runs open-source models like Llama, Mixtral, Gemma, and DeepSeek at incredible speed with a generous free tier.

## Quick Start

1. Apply the **Catalyst - Groq** template to any Service Task
2. Set your API key (or secret reference)
3. Edit the Request Payload for your use case
4. Deploy and run

## Authentication

| Setting | Value |
|---------|-------|
| Auth Type | `bearerToken` |
| Auth Header | `Authorization` |
| Auth Prefix | `Bearer` |
| Console | [console.groq.com](https://console.groq.com) |
| Key Prefix | `gsk_...` |
| Default Secret Name | `groq_api_key` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `groq_api_key` → env `GROQ_API_KEY` |
| Docker Secret File | `file` | Reads `/run/secrets/groq_api_key` |
| Properties File | `properties` | Key `groq_api_key` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Request Payload (Default)

```json
{
  "model": "llama-3.3-70b-versatile",
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
| `llama-3.3-70b-versatile` | Llama 3.3 70B — great all-rounder (default) |
| `llama-3.1-8b-instant` | Llama 3.1 8B — ultra-fast, lightweight |
| `gemma2-9b-it` | Google Gemma 2 9B |
| `deepseek-r1-distill-llama-70b` | DeepSeek R1 distilled — reasoning |
| `qwen/qwen3-32b` | Qwen 3 32B — multilingual |


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
| 401 | `AUTH_FAILED` | Invalid API key | Check key at console.groq.com |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff |
| 400 | `INVALID_REQUEST` | Malformed request | Check payload JSON |


## Example Process

```
[Start] → [User Task: Configure] → [Service Task: Ask Groq] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

## Tips

- **Groq is FAST**
- Not to be confused with Grok (xAI). Groq = hardware company, Grok = xAI's model.
- **Generous free tier**
- Great for latency-sensitive workflows and real-time processing.

## Files

| File | Description |
|------|-------------|
| `groq.element.json` | Element Template |
| `groq-example.bpmn` | Example BPMN process |
| `groq.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
