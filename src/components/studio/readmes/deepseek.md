# Catalyst Connector: DeepSeek
High-performance AI at breakthrough pricing — exceptional coding and reasoning

## About DeepSeek

DeepSeek is a Chinese AI lab whose models rival GPT-4 and Claude at a fraction of the cost. DeepSeek-V3 and DeepSeek-R1 top benchmarks in coding, math, and reasoning. Note: the API processes data in China. For data residency, run DeepSeek-R1 via Ollama (local), Groq (US), or Together AI (US) instead.

## Quick Start

1. Apply the **Catalyst - DeepSeek** template to any Service Task
2. Set your API key (or secret reference)
3. Edit the Request Payload for your use case
4. Deploy and run

## Authentication

| Setting | Value |
|---------|-------|
| Auth Type | `bearerToken` |
| Auth Header | `Authorization` |
| Auth Prefix | `Bearer` |
| Console | [platform.deepseek.com](https://platform.deepseek.com) |
| Key Prefix | `sk-...` |
| Default Secret Name | `deepseek_api_key` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `deepseek_api_key` → env `DEEPSEEK_API_KEY` |
| Docker Secret File | `file` | Reads `/run/secrets/deepseek_api_key` |
| Properties File | `properties` | Key `deepseek_api_key` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Request Payload (Default)

```json
{
  "model": "deepseek-chat",
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
| `deepseek-chat` | DeepSeek V3 — general purpose (default) |
| `deepseek-reasoner` | DeepSeek R1 — chain-of-thought reasoning |


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
| `aiReply` | `choices[0].message.content` | DeepSeek's response text |
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
| 401 | `AUTH_FAILED` | Invalid API key | Check key at platform.deepseek.com |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff |
| 400 | `INVALID_REQUEST` | Malformed request | Check payload JSON |


## Example Process

```
[Start] → [User Task: Configure] → [Service Task: Ask DeepSeek] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

## Tips

- Often 10-50x cheaper than OpenAI for equivalent quality.
- **deepseek-reasoner (R1) is a chain-of-thought model**
- Data is processed in China. Use Ollama or Groq for US/EU data residency.
- Generous free credits on signup.

## Files

| File | Description |
|------|-------------|
| `deepseek.element.json` | Element Template |
| `deepseek-example.bpmn` | Example BPMN process |
| `deepseek.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
