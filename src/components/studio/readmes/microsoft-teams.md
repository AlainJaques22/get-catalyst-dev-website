# Catalyst Connector: Microsoft Teams
Send messages to a Microsoft Teams channel via Incoming Webhook

## About Microsoft Teams Webhooks

Incoming Webhooks let you post messages to a Teams channel from external applications. You create a webhook in the Teams channel settings and get a unique URL. POST JSON to that URL and the message appears in the channel.

No API keys, no OAuth, no app registration. The webhook URL is both the endpoint and the authentication — treat it like a password.

Use this to:
- Notify your team when a process completes or fails
- Send approval requests with Adaptive Cards
- Post deployment status updates
- Alert on SLA breaches or exceptions
- Share process metrics and summaries

## Quick Start

1. **Create a webhook in Teams:** Channel → Manage channel → Edit → Incoming Webhook → Configure
2. Copy the webhook URL
3. Apply the **Catalyst - Microsoft Teams** template to a Service Task
4. Paste the webhook URL
5. Edit the message payload
6. Deploy and run

## Message Formats

### Adaptive Card (recommended)

Rich formatted messages with titles, facts, images, and action buttons. This is the default.

```json
{
  "type": "message",
  "attachments": [
    {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "content": {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.4",
        "body": [
          {
            "type": "TextBlock",
            "text": "Process Completed",
            "size": "Large",
            "weight": "Bolder"
          },
          {
            "type": "TextBlock",
            "text": "${userMessage}",
            "wrap": true
          },
          {
            "type": "FactSet",
            "facts": [
              { "title": "Source", "value": "Catalyst" },
              { "title": "Status", "value": "Success" }
            ]
          }
        ]
      }
    }
  ]
}
```

### Plain Text (simple)

For quick notifications:

```json
{
  "text": "Process completed: ${userMessage}"
}
```

### Design Adaptive Cards

Use the [Adaptive Cards Designer](https://adaptivecards.io/designer/) to visually build cards, then copy the JSON into the payload field.

## Authentication

Teams webhooks need **no authentication**. The URL itself is the secret.

| Setting | Value | Why |
|---------|-------|-----|
| Auth Type | `none` (hidden) | URL is the auth |
| Secret Source | `variable` (hidden) | Not applicable |
| Auth Value | `not_required` (hidden) | Not applicable |

**Security:** The webhook URL contains a unique token. Anyone with the URL can post to your channel. Store it as an environment variable or Docker secret in production — don't hardcode it in the BPMN.

### Securing the webhook URL in production

Even though the connector uses `authType: none`, you should store the webhook URL itself securely:

```
# Environment variable
TEAMS_WEBHOOK_URL=https://xxxxx.webhook.office.com/webhookb2/xxxxxxxx

# Reference in the BPMN payload
catalyst_url = ${teamsWebhookUrl}
# Where teamsWebhookUrl is set from System.getenv() or a properties file
```

## Template Fields

### Visible Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Teams Webhook URL | String | *(placeholder)* | The incoming webhook URL from Teams |
| Message Format | Dropdown | `card` | `card` (Adaptive Card) or `text` (plain) |
| Message Payload | Text | *(Adaptive Card template)* | JSON body to POST |
| Error Mapping | Text | *(see below)* | HTTP → BPMN error codes |
| Timeout | String | `10` | Max wait time in seconds |

### Hidden Fields

| Field | Value | Description |
|-------|-------|-------------|
| HTTP Method | `POST` | Always POST |
| Auth Type | `none` | No auth needed |
| Content-Type | `application/json` | Required by Teams |
| Response Mapping | `{}` | Teams returns `1`, not JSON |
| Retry on 429 | `true` | Auto-retry on rate limit |
| Max Retries | `3` | Retry attempts |

## Error Handling

```json
{
  "429": "RATE_LIMITED",
  "400": "BAD_PAYLOAD",
  "404": "WEBHOOK_NOT_FOUND",
  "413": "PAYLOAD_TOO_LARGE"
}
```

| HTTP Status | BPMN Error | Cause | Action |
|-------------|------------|-------|--------|
| 400 | `BAD_PAYLOAD` | Invalid JSON or card structure | Check payload format |
| 404 | `WEBHOOK_NOT_FOUND` | Webhook deleted or URL wrong | Recreate webhook in Teams |
| 413 | `PAYLOAD_TOO_LARGE` | Message exceeds 28KB limit | Reduce payload size |
| 429 | `RATE_LIMITED` | More than 4 requests/second | Auto-retried with backoff |

## Rate Limits

Teams allows 4 webhook requests per second per channel. The connector auto-retries on 429 with exponential backoff.

If you're sending high-volume notifications, consider batching messages or using a queue.

## Response

Teams webhooks return `1` (the literal string "1") on success with HTTP 200. There's no JSON response body to map. Use the standard Catalyst variables:

| Variable | Value on Success | Description |
|----------|-----------------|-------------|
| `catalyst_success` | `true` | Message was accepted |
| `catalyst_statusCode` | `200` | HTTP 200 OK |
| `catalyst_responseBody` | `1` | Teams acknowledgement |
| `catalyst_error` | *(empty)* | No error |

## Adaptive Card Recipes

### Process Completion Notification
```json
{
  "type": "message",
  "attachments": [{
    "contentType": "application/vnd.microsoft.card.adaptive",
    "content": {
      "type": "AdaptiveCard",
      "version": "1.4",
      "body": [
        { "type": "TextBlock", "text": "✅ Process Completed", "size": "Large", "weight": "Bolder", "color": "Good" },
        { "type": "FactSet", "facts": [
          { "title": "Process", "value": "${processName}" },
          { "title": "Duration", "value": "${duration}" },
          { "title": "Result", "value": "${result}" }
        ]}
      ]
    }
  }]
}
```

### Error Alert
```json
{
  "type": "message",
  "attachments": [{
    "contentType": "application/vnd.microsoft.card.adaptive",
    "content": {
      "type": "AdaptiveCard",
      "version": "1.4",
      "body": [
        { "type": "TextBlock", "text": "🚨 Process Failed", "size": "Large", "weight": "Bolder", "color": "Attention" },
        { "type": "TextBlock", "text": "${errorMessage}", "wrap": true },
        { "type": "FactSet", "facts": [
          { "title": "Process", "value": "${processName}" },
          { "title": "Step", "value": "${failedStep}" },
          { "title": "Time", "value": "${timestamp}" }
        ]}
      ]
    }
  }]
}
```

### Approval Request with Link
```json
{
  "type": "message",
  "attachments": [{
    "contentType": "application/vnd.microsoft.card.adaptive",
    "content": {
      "type": "AdaptiveCard",
      "version": "1.4",
      "body": [
        { "type": "TextBlock", "text": "📋 Approval Required", "size": "Large", "weight": "Bolder" },
        { "type": "TextBlock", "text": "${requestDescription}", "wrap": true },
        { "type": "FactSet", "facts": [
          { "title": "Requested by", "value": "${requester}" },
          { "title": "Amount", "value": "${amount}" }
        ]}
      ],
      "actions": [
        { "type": "Action.OpenUrl", "title": "Review in Tasklist", "url": "${tasklistUrl}" }
      ]
    }
  }]
}
```

## Setting Up the Webhook in Teams

1. Open Microsoft Teams
2. Navigate to the channel you want to post to
3. Click **More options (•••)** → **Manage channel**
4. Select **Edit**
5. Search for **Incoming Webhook** → **Add**
6. Click **Configure**
7. Give it a name (e.g. "Catalyst Notifications")
8. Optionally upload an icon
9. Click **Create**
10. **Copy the URL** — this is your webhook URL

## Files

| File | Description |
|------|-------------|
| `microsoft-teams.element.json` | Element Template |
| `microsoft-teams-example.bpmn` | Example BPMN process |
| `microsoft-teams.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
