# Catalyst Connector: Ollama
Run AI models locally with Ollama — zero API keys, zero cost, fully air-gapped

## About Ollama

Ollama is a free, open-source tool for running LLMs locally. It downloads and manages models like Llama, Mistral, Phi, and Gemma — all running entirely on your hardware with no internet required. Zero data leaves your network, zero API keys, zero per-token costs. Ollama exposes an OpenAI-compatible API, making it a drop-in local replacement for cloud providers.

## Quick Start

1. Apply the **Catalyst - Ollama** template to any Service Task
2. Set your API key (or secret reference)
3. Edit the Request Payload for your use case
4. Deploy and run

## Authentication

| Setting | Value |
|---------|-------|
| Auth Type | `none` |
| Auth Header | `Authorization` |
| Auth Prefix | `Bearer` |
| Console | [ollama.com](https://ollama.com/download) |
| Key Prefix | `(none)` |
| Default Secret Name | `not_required` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `not_required` → env `NOT_REQUIRED` |
| Docker Secret File | `file` | Reads `/run/secrets/not_required` |
| Properties File | `properties` | Key `not_required` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Request Payload (Default)

```json
{
  "model": "llama3.2",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "${userMessage}"}
  ]
}
```

## Available Models

| Model | Description |
|-------|-------------|
| `llama3.2` | Meta Llama 3.2 3B (default, fast) |
| `llama3.1` | Meta Llama 3.1 8B (more capable) |
| `mistral` | Mistral 7B |
| `phi3` | Microsoft Phi-3 |
| `gemma2` | Google Gemma 2 |
| `deepseek-coder` | DeepSeek Coder |


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
  "404": "MODEL_NOT_FOUND",
  "500": "SERVER_ERROR"
}
```

| HTTP Status | BPMN Error | Cause | Action |
|-------------|------------|-------|--------|
| 404 | `MODEL_NOT_FOUND` | Model not pulled | Run: ollama pull llama3.2 |
| 500 | `SERVER_ERROR` | Ollama server error | Check Ollama container logs |


## Example Process

```
[Start] → [User Task: Configure] → [Service Task: Ask Ollama] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

## Tips

- **No API key needed**
- Pull models first: docker exec catalyst-ollama ollama pull llama3.2
- CPU inference takes 10-60s. GPU drops that to 1-5s.
- Error 404 means the model hasn't been pulled yet.
- Perfect for air-gapped environments and development without API credits.

## Files

| File | Description |
|------|-------------|
| `ollama.element.json` | Element Template |
| `ollama-example.bpmn` | Example BPMN process |
| `ollama.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
