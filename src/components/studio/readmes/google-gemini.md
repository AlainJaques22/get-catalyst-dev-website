# Catalyst Connector: Google Gemini
Send chat completions to Google Gemini via OpenAI-compatible endpoint

## About Google Gemini

Google Gemini is Google's latest family of multimodal AI models. This connector uses Google's OpenAI-compatible endpoint, meaning the request and response format is identical to OpenAI — no Google Cloud SDK needed. API keys are free from Google AI Studio.

## Quick Start

1. Apply the **Catalyst - Google Gemini** template to any Service Task
2. Set your API key (or secret reference)
3. Edit the Request Payload for your use case
4. Deploy and run

## Authentication

| Setting | Value |
|---------|-------|
| Auth Type | `bearerToken` |
| Auth Header | `Authorization` |
| Auth Prefix | `Bearer` |
| Console | [aistudio.google.com](https://aistudio.google.com/apikey) |
| Key Prefix | `AIza...` |
| Default Secret Name | `gemini_api_key` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `gemini_api_key` → env `GEMINI_API_KEY` |
| Docker Secret File | `file` | Reads `/run/secrets/gemini_api_key` |
| Properties File | `properties` | Key `gemini_api_key` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Request Payload (Default)

```json
{
  "model": "gemini-2.0-flash",
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
| `gemini-2.0-flash` | Fast, multimodal (default) |
| `gemini-2.0-flash-lite` | Fastest, most affordable |
| `gemini-2.5-flash` | Latest, enhanced reasoning |
| `gemini-2.5-pro` | Most capable Gemini model |


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
| `aiReply` | `choices[0].message.content` | Gemini's response text |
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
| 401 | `AUTH_FAILED` | Invalid API key | Get key at aistudio.google.com |
| 429 | `RATE_LIMITED` | Quota exceeded | Check quota in Google Cloud Console |
| 400 | `INVALID_REQUEST` | Malformed request | Check payload JSON |


## Example Process

```
[Start] → [User Task: Configure] → [Service Task: Ask Google Gemini] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

## Tips

- **Uses the OpenAI-compatible endpoint**
- Gemini API keys are free from Google AI Studio with generous quotas.
- gemini-2.0-flash is extremely fast and has a large free tier.
- **No Google Cloud project required**

## Files

| File | Description |
|------|-------------|
| `google-gemini.element.json` | Element Template |
| `google-gemini-example.bpmn` | Example BPMN process |
| `google-gemini.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
