# Catalyst Connector: Anthropic Claude

Send messages to Anthropic's Claude models from your Camunda 7 process.

## Quick Start

1. Apply the **Catalyst - Anthropic Claude** template to any Service Task
2. Set your API key (or a variable reference)
3. Edit the Request Payload to match your process variables
4. Deploy and run

---

## Authentication

This connector uses an Anthropic API key.

**Getting a key:**
1. Go to [console.anthropic.com](https://console.anthropic.com) (this is separate from claude.ai)
2. Navigate to **API Keys**
3. Click **Create Key**, copy it immediately (starts with `sk-ant-...`)
4. Ensure you have **credits loaded** under Billing -- the API is prepaid

**In the template:** The **Secret Source** dropdown controls how the API key is resolved:

| Secret Source | API Key field contains | How it works |
|---|---|---|
| Environment Variables (default) | Secret name, e.g. `anthropic_api_key` | Resolved from `ANTHROPIC_API_KEY` env var on the Camunda engine |
| Docker Secrets (files) | Secret name, e.g. `anthropic_api_key` | Read from `/run/secrets/anthropic_api_key` |
| Properties File | Secret name, e.g. `anthropic_api_key` | Looked up in the properties file on the engine |
| Process Variable (dev only) | Literal key, e.g. `sk-ant-xyz789` | Used as-is. **Not recommended** -- the key is visible in Camunda process history. |

For production, use Environment Variables or Docker Secrets. Ask your platform team which backend is configured in your environment.

**Note:** An Anthropic API key is different from a Claude.ai subscription. Even with Claude Pro, you need a separate developer account with credits for API access.

---

## Template Fields

### Visible Fields

| Field | Group | Description |
|-------|-------|-------------|
| **Secret Source** | Authentication | Where to resolve the API key (env, file, properties, or variable) |
| **Anthropic API Key** | Authentication | The secret name (for env/file/properties) or literal key (for variable mode) |
| **Request Payload** | Request Configuration | The JSON body sent to Claude (see below) |
| **Response Mapping** | Response Mapping | Maps response fields to process variables |
| **Error Mapping** | Response Mapping | Maps HTTP errors to BPMN error codes |
| **Timeout** | Connection | Seconds to wait for a response (default: 120) |

### Hidden Fields (pre-configured, no action needed)

| Field | Value | Purpose |
|-------|-------|---------|
| catalyst_url | `https://api.anthropic.com/v1/messages` | API endpoint |
| catalyst_method | `POST` | HTTP method |
| catalyst_authType | `apiKeyHeader` | Auth strategy |
| catalyst_authHeader | `x-api-key` | Header name (Anthropic uses a custom header) |
| catalyst_authPrefix | `NONE` | No prefix — key is sent raw |
| catalyst_headers | `{"Content-Type": "application/json", "anthropic-version": "2023-06-01"}` | Request headers including required API version |
| catalyst_retryOn429 | `true` | Auto-retry on rate limits |
| catalyst_maxRetries | `3` | Max retry attempts |

---

## Request Payload

The payload is a visible, editable JSON field. The default is:

```json
{
  "model": "claude-sonnet-4-5-20250929",
  "max_tokens": 1024,
  "system": "You are a helpful assistant.",
  "messages": [
    {"role": "user", "content": "${userMessage}"}
  ]
}
```

### Key difference from OpenAI/Grok

Anthropic's API puts the **system prompt as a top-level field**, not inside the messages array. This is already set up correctly in the default payload.

### What to edit

| Field | Type | What to do |
|-------|------|------------|
| `model` | Literal | Change to a different Claude model (see below) |
| `max_tokens` | Number | **Required.** Maximum response length |
| `system` | Literal or `${var}` | Your system instructions |
| `user content` | `${variableName}` | Reference your process variable |

### Using process variables

Replace any value with `${yourVariableName}` to pull from your process:

```json
{
  "model": "claude-sonnet-4-5-20250929",
  "max_tokens": 2000,
  "system": "${instructions}",
  "messages": [
    {"role": "user", "content": "${customerQuery}"}
  ]
}
```

The variable names must match what your upstream tasks set — there are no naming requirements. Use whatever names make sense for your process.

### Available models

| Model | Best for |
|-------|----------|
| `claude-haiku-4-5-20251001` | Fast and cheap, good for simple tasks |
| `claude-sonnet-4-5-20250929` | Balanced quality and speed (default) |
| `claude-opus-4-5-20250918` | Most powerful, highest cost |

**Note:** Anthropic model names include dates. These are the current model IDs as of early 2026.

---

## Response Mapping

Maps fields from Claude's response into process variables. Default:

```json
{
  "aiReply": "content[0].text",
  "modelUsed": "model",
  "inputTokens": "usage.input_tokens",
  "outputTokens": "usage.output_tokens",
  "stopReason": "stop_reason"
}
```

| Process Variable | JSON Path | What it contains |
|-----------------|-----------|------------------|
| `aiReply` | `content[0].text` | Claude's response text |
| `modelUsed` | `model` | Which model actually responded |
| `inputTokens` | `usage.input_tokens` | Tokens used by your input |
| `outputTokens` | `usage.output_tokens` | Tokens used by the response |
| `stopReason` | `stop_reason` | Why the response ended (`end_turn`, `max_tokens`, etc.) |

You can rename the variable names (left side) to match your process. The JSON paths (right side) should stay as-is unless you know the API response structure.

**Additional paths you can add:**

| JSON Path | Returns |
|-----------|---------|
| `id` | Unique message ID |
| `type` | Always `message` |

---

## Error Handling

### Error Mapping

Default mapping from HTTP status codes to BPMN error codes:

```json
{
  "429": "RATE_LIMITED",
  "401": "AUTH_FAILED",
  "400": "INVALID_REQUEST",
  "529": "API_OVERLOADED"
}
```

### What each error means

| HTTP Status | BPMN Error Code | Cause | What to do |
|-------------|----------------|-------|------------|
| 401 | `AUTH_FAILED` | Invalid API key or no credits | Check your key at console.anthropic.com and ensure credits are loaded |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried 3 times with backoff. If still failing, wait or check your usage tier |
| 400 | `INVALID_REQUEST` | Malformed payload or missing `max_tokens` | Check your JSON syntax. `max_tokens` is required for Anthropic |
| 529 | `API_OVERLOADED` | Anthropic's servers are overloaded | Temporary. Auto-retried. If persistent, wait and try later |

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
[Start] → [User Task: Ask Question] → [Service Task: Ask Claude] → [User Task: Show Answer] → [End]
```

1. **User Task** sets `userQuestion` via a form field
2. **Service Task** uses the Claude template with payload:
   ```json
   {
     "model": "claude-haiku-4-5-20251001",
     "max_tokens": 500,
     "system": "Answer concisely in one paragraph.",
     "messages": [
       {"role": "user", "content": "${userQuestion}"}
     ]
   }
   ```
3. **User Task** displays `${aiReply}` in a form field

---

## Tips

- **Start with `claude-sonnet-4-5-20250929`** — it's the best balance of quality and cost. Use Haiku for high-volume simple tasks, Opus for complex reasoning.
- **`max_tokens` is required** — unlike OpenAI, Anthropic requires you to set this. Don't forget it or you'll get a 400 error.
- **System prompt is top-level** — if you're copying a payload from an OpenAI connector, remember to move the system prompt out of the messages array and into the `system` field.
- **Timeout is set to 120s** — Claude can be slower than other models on complex prompts. The higher default accounts for this.
- **Credits are prepaid** — unlike OpenAI's pay-as-you-go, Anthropic requires you to buy credits upfront. If your key works but calls fail, check your credit balance.
- **Add a boundary error event** — always handle failures gracefully in production processes.
