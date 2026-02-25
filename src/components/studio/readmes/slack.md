# Catalyst Connector: Slack
Send messages to Slack channels via the Slack API

## About Slack

Slack is the leading workplace messaging platform. This connector uses the chat.postMessage API to send messages to channels. You need a Slack App with a Bot Token (xoxb-...) and the `chat:write` scope. Important: Slack returns HTTP 200 even on errors — always check the `ok` field in the response.

## Quick Start

1. Apply the **Catalyst - Slack** template to any Service Task
2. Set your API key (or secret reference)
3. Edit the Request Payload for your use case
4. Deploy and run

## Authentication

| Setting | Value |
|---------|-------|
| Auth Type | `bearerToken` |
| Auth Header | `Authorization` |
| Auth Prefix | `Bearer` |
| Console | [api.slack.com](https://api.slack.com/apps) |
| Key Prefix | `xoxb-...` |
| Default Secret Name | `slack_bot_token` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `slack_bot_token` → env `SLACK_BOT_TOKEN` |
| Docker Secret File | `file` | Reads `/run/secrets/slack_bot_token` |
| Properties File | `properties` | Key `slack_bot_token` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Request Payload (Default)

```json
{
  "channel": "${slackChannel}",
  "text": "${slackMessage}"
}
```



## Response Mapping (Default)

```json
{
  "slackOk": "ok",
  "slackTs": "ts",
  "slackChannel": "channel"
}
```

| Variable | JSON Path | Description |
|----------|-----------|-------------|
| `slackOk` | `ok` | Whether the message was sent (true/false) |
| `slackTs` | `ts` | Message timestamp (used as message ID) |
| `slackChannel` | `channel` | Channel the message was posted to |


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
| 401 | `AUTH_FAILED` | Invalid bot token | Check token at api.slack.com/apps |
| 429 | `RATE_LIMITED` | Too many messages | ~1 msg/sec per channel limit |
| 400 | `INVALID_REQUEST` | Bad request | Check channel ID format (C0123456789) |


## Example Process

```
[Start] → [User Task: Configure] → [Service Task: Ask Slack] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

## Tips

- **Slack returns HTTP 200 even on errors! Check the `slackOk` variable**
- **Channel IDs look like C0123456789**
- Bot must be invited to the channel first: /invite @YourBotName
- Rate limit: ~1 message per second per channel.
- For rich formatting, use Slack Block Kit JSON in the payload instead of plain text.

## Files

| File | Description |
|------|-------------|
| `slack.element.json` | Element Template |
| `slack-example.bpmn` | Example BPMN process |
| `slack.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
