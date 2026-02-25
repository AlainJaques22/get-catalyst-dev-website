# Catalyst Connector: Perplexity
AI with built-in web search — answers grounded in real-time information

## About Perplexity

Perplexity is an AI-powered answer engine that combines LLMs with real-time web search. Unlike standard LLMs that rely solely on training data, Perplexity's Sonar models search the web and include citations in responses. Ideal for workflows needing current information — market research, competitive analysis, news monitoring, and fact-checking.

## Quick Start

1. Apply the **Catalyst - Perplexity** template to any Service Task
2. Set your API key (or secret reference)
3. Edit the Request Payload for your use case
4. Deploy and run

## Authentication

| Setting | Value |
|---------|-------|
| Auth Type | `bearerToken` |
| Auth Header | `Authorization` |
| Auth Prefix | `Bearer` |
| Console | [perplexity.ai](https://www.perplexity.ai/settings/api) |
| Key Prefix | `pplx-...` |
| Default Secret Name | `perplexity_api_key` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `perplexity_api_key` → env `PERPLEXITY_API_KEY` |
| Docker Secret File | `file` | Reads `/run/secrets/perplexity_api_key` |
| Properties File | `properties` | Key `perplexity_api_key` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Request Payload (Default)

```json
{
  "model": "sonar",
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
| `sonar` | Default, with web search |
| `sonar-pro` | Larger model, with web search |
| `sonar-reasoning` | Chain-of-thought + web search |


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
| `aiReply` | `choices[0].message.content` | Perplexity's response text (with citations) |
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
| 401 | `AUTH_FAILED` | Invalid API key | Check key at perplexity.ai/settings/api |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff |
| 400 | `INVALID_REQUEST` | Malformed request | Check payload JSON |


## Example Process

```
[Start] → [User Task: Configure] → [Service Task: Ask Perplexity] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

## Tips

- **Sonar models search the web automatically**
- Responses include inline citations to source URLs for verification.
- **Paid API only**
- Unique capability: no other provider combines LLM + live search this seamlessly.

## Files

| File | Description |
|------|-------------|
| `perplexity.element.json` | Element Template |
| `perplexity-example.bpmn` | Example BPMN process |
| `perplexity.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
