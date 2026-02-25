# Catalyst Connector: SendGrid
Send transactional emails via SendGrid's v3 Mail API

## About SendGrid

SendGrid (by Twilio) is a cloud-based email delivery platform. Their v3 Mail API handles transactional and marketing emails with high deliverability. Free tier: 100 emails/day forever, no credit card required. Important: SendGrid returns 202 Accepted with an empty body on success — there's nothing to map in the response.

## Quick Start

1. Apply the **Catalyst - SendGrid** template to any Service Task
2. Set your API key (or secret reference)
3. Edit the Request Payload for your use case
4. Deploy and run

## Authentication

| Setting | Value |
|---------|-------|
| Auth Type | `bearerToken` |
| Auth Header | `Authorization` |
| Auth Prefix | `Bearer` |
| Console | [app.sendgrid.com](https://app.sendgrid.com/settings/api_keys) |
| Key Prefix | `SG....` |
| Default Secret Name | `sendgrid_api_key` |

### Secret Sources

| Source | Value | How It Resolves |
|--------|-------|----------------|
| Environment Variable | `env` | `sendgrid_api_key` → env `SENDGRID_API_KEY` |
| Docker Secret File | `file` | Reads `/run/secrets/sendgrid_api_key` |
| Properties File | `properties` | Key `sendgrid_api_key` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal key value in the BPMN |

## Request Payload (Default)

```json
{
  "personalizations": [
    {"to": [{"email": "${recipientEmail}"}]}
  ],
  "from": {"email": "${senderEmail}"},
  "subject": "${emailSubject}",
  "content": [
    {"type": "text/plain", "value": "${emailBody}"}
  ]
}
```



## Response Mapping (Default)

```json
{}
```



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
  "403": "SENDER_NOT_VERIFIED",
  "400": "INVALID_REQUEST"
}
```

| HTTP Status | BPMN Error | Cause | Action |
|-------------|------------|-------|--------|
| 401 | `AUTH_FAILED` | Invalid API key | Check key at app.sendgrid.com |
| 403 | `SENDER_NOT_VERIFIED` | From email not verified | Verify sender in SendGrid dashboard |
| 429 | `RATE_LIMITED` | Too many emails | Auto-retried with backoff |
| 400 | `INVALID_REQUEST` | Bad request | Check email addresses and payload |


## Example Process

```
[Start] → [User Task: Configure] → [Service Task: Ask SendGrid] → [User Task: Review] → [End]
                                             |
                                       [Boundary Error] ────────────→ [Review]
```

## Tips

- **SendGrid returns 202 with EMPTY body on success**
- Error 403 almost always means the 'from' email isn't verified in your SendGrid account.
- Free tier: 100 emails/day forever. No credit card needed.
- Use catalyst_success and catalyst_statusCode to check if the email was accepted.

## Files

| File | Description |
|------|-------------|
| `sendgrid.element.json` | Element Template |
| `sendgrid-example.bpmn` | Example BPMN process |
| `sendgrid.svg` | Connector logo (64×64) |
| `README.md` | This documentation |

---

*Part of the [Catalyst Connector Library](https://catalyst-connector.com) — Native Camunda 7 integrations.*
