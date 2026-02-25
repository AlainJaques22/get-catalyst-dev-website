# Catalyst Connector: xAI Grok

Send chat completion requests to xAI's Grok models from your Camunda 7 process.

## Quick Start

1. Apply the **Catalyst - xAI Grok** template to any Service Task
2. Set your API key (or a variable reference)
3. Edit the Request Payload to match your process variables
4. Deploy and run

---

## Authentication

This connector uses an xAI API key.

**Getting a key:**
1. Go to [console.x.ai](https://console.x.ai)
2. Navigate to **API Keys**
3. Click **Create API key**, copy it immediately (starts with `xai-...`)
4. Ensure you have credits or an active plan

**In the template:** The **Secret Source** dropdown controls how the API key is resolved:

| Secret Source | API Key field contains | How it works |
|---|---|---|
| Environment Variables (default) | Secret name, e.g. `xai_api_key` | Resolved from `XAI_API_KEY` env var on the Camunda engine |
| Docker Secrets (files) | Secret name, e.g. `xai_api_key` | Read from `/run/secrets/xai_api_key` |
| Properties File | Secret name, e.g. `xai_api_key` | Looked up in the properties file on the engine |
| Process Variable (dev only) | Literal key, e.g. `xai-abc123` | Used as-is. **Not recommended** -- the key is visible in Camunda process history. |

For production, use Environment Variables or Docker Secrets. Ask your platform team which backend is configured in your environment.

---

## Template Fields

### Visible Fields

| Field | Group | Description |
|-------|-------|-------------|
| **Secret Source** | Authentication | Where to resolve the API key (env, file, properties, or variable) |
| **xAI API Key** | Authentication | The secret name (for env/file/properties) or literal key (for variable mode) |
| **Request Payload** | Request Configuration | The JSON body sent to Grok (see below) |
| **Response Mapping** | Response Mapping | Maps response fields to process variables |
| **Error Mapping** | Response Mapping | Maps HTTP errors to BPMN error codes |
| **Timeout** | Connection | Seconds to wait for a response (default: 60) |

### Hidden Fields (pre-configured, no action needed)

| Field | Value | Purpose |
|-------|-------|---------|
| catalyst_url | `https://api.x.ai/v1/chat/completions` | API endpoint |
| catalyst_method | `POST` | HTTP method |
| catalyst_authType | `apiKeyHeader` | Auth strategy |
| catalyst_authHeader | `Authorization` | Header name |
| catalyst_authPrefix | `Bearer` | Header prefix |
| catalyst_headers | `{"Content-Type": "application/json"}` | Request headers |
| catalyst_retryOn429 | `true` | Auto-retry on rate limits |
| catalyst_maxRetries | `3` | Max retry attempts |

---

## Request Payload

The payload is a visible, editable JSON field. The default is:

```json
{
  "model": "grok-3-mini-fast",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "${userMessage}"}
  ],
  "temperature": 0.7,
  "max_tokens": 1000
}
```

### What to edit

| Field | Type | What to do |
|-------|------|------------|
| `model` | Literal | Change to `grok-3-mini`, `grok-3`, `grok-4`, etc. |
| `system content` | Literal or `${var}` | Your system instructions |
| `user content` | `${variableName}` | Reference your process variable |
| `temperature` | Number 0.0–2.0 | Lower = more deterministic, higher = more creative |
| `max_tokens` | Number | Maximum length of the response |

### Using process variables

Replace any value with `${yourVariableName}` to pull from your process:

```json
{
  "model": "grok-3",
  "messages": [
    {"role": "system", "content": "${instructions}"},
    {"role": "user", "content": "${customerQuery}"}
  ],
  "temperature": 0.3,
  "max_tokens": 2000
}
```

The variable names must match what your upstream tasks set — there are no naming requirements. Use whatever names make sense for your process.

### Available models

| Model | Best for |
|-------|----------|
| `grok-3-mini-fast` | Cheapest and fastest, good for simple tasks |
| `grok-3-mini` | Balanced speed and quality |
| `grok-3` | High quality reasoning |
| `grok-4` | Most powerful, highest cost |

---

## Response Mapping

Maps fields from Grok's response into process variables. Default:

```json
{
  "aiReply": "choices[0].message.content",
  "modelUsed": "model",
  "tokensUsed": "usage.total_tokens",
  "finishReason": "choices[0].finish_reason"
}
```

| Process Variable | JSON Path | What it contains |
|-----------------|-----------|------------------|
| `aiReply` | `choices[0].message.content` | The AI's response text |
| `modelUsed` | `model` | Which model actually responded |
| `tokensUsed` | `usage.total_tokens` | Total tokens consumed |
| `finishReason` | `choices[0].finish_reason` | Why the response ended (`stop`, `length`, etc.) |

You can rename the variable names (left side) to match your process. The JSON paths (right side) should stay as-is unless you know the API response structure.

**Additional paths you can add:**

| JSON Path | Returns |
|-----------|---------|
| `usage.prompt_tokens` | Tokens used by your input |
| `usage.completion_tokens` | Tokens used by the response |
| `id` | Unique request ID |

---

## Error Handling

### Error Mapping

Default mapping from HTTP status codes to BPMN error codes:

```json
{
  "429": "RATE_LIMITED",
  "401": "AUTH_FAILED",
  "400": "INVALID_REQUEST"
}
```

### What each error means

| HTTP Status | BPMN Error Code | Cause | What to do |
|-------------|----------------|-------|------------|
| 401 | `AUTH_FAILED` | Invalid or expired API key | Check your key at console.x.ai |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried 3 times with backoff. If still failing, wait or check rate limits in xAI console |
| 400 | `INVALID_REQUEST` | Malformed payload | Check your JSON syntax and variable references |

### Using boundary events

Add a **Boundary Error Event** to your service task to catch failures gracefully instead of killing the process. Leave the error code empty to catch all errors, or specify a code like `AUTH_FAILED` to handle specific failures differently.

### Built-in variables (always available)

After execution, these variables are set regardless of success or failure:

| Variable | Type | Description |
|----------|------|-------------|
| `catalyst_success` | Boolean | `true` if HTTP 2xx |
| `catalyst_statusCode` | Integer | The HTTP status code |
| `catalyst_error` | String | Error message (empty on success) |

---

## Example: Simple Q&A Process

```
[Start] → [User Task: Ask Question] → [Service Task: Ask Grok] → [User Task: Show Answer] → [End]
```

1. **User Task** sets `userQuestion` via a form field
2. **Service Task** uses the Grok template with payload:
   ```json
   {
     "model": "grok-3-mini-fast",
     "messages": [
       {"role": "system", "content": "Answer concisely in one paragraph."},
       {"role": "user", "content": "${userQuestion}"}
     ],
     "temperature": 0.3,
     "max_tokens": 500
   }
   ```
3. **User Task** displays `${aiReply}` in a form field

---

## Tips

- **Start with `grok-3-mini-fast`** — it's the cheapest option. Move up to `grok-3` or `grok-4` when you need higher quality.
- **Grok uses the same API format as OpenAI** — if you've used the OpenAI connector, this works identically. Only the URL, API key, and model names differ.
- **Set temperature low (0.1–0.3)** for factual tasks, higher (0.7–1.0) for creative tasks.
- **Add a boundary error event** — always handle failures gracefully in production processes.
