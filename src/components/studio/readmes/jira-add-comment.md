# Catalyst Connector: Jira Add Comment
Add a comment to an existing Jira issue — log progress, notes, and audit trail entries.

**API:** `POST /rest/api/{v}/issue/{key}/comment`
**Auth:** Basic Auth (Cloud) or Bearer PAT (Data Center)
**Response:** `201 Created` with comment ID and self link

## Quick Start

1. Generate a Jira API token (Cloud) or Personal Access Token (Data Center)
2. Store the credential as an environment variable (see Authentication below)
3. Apply the **Catalyst - Jira Add Comment** template to a Service Task
4. Set your Jira instance name, issue key, and comment text
5. Deploy and run

## Authentication

### Jira Cloud (Basic Auth)

Jira Cloud uses Basic Auth with your email and an API token. The Catalyst runtime handles Base64 encoding automatically — provide the raw `email:api_token` string.

**Step 1:** Generate an API token at https://id.atlassian.com/manage-profile/security/api-tokens

**Step 2:** Store the raw credential as an environment variable:
```bash
# In your .env file (NOT base64-encoded — the runtime encodes it for you)
JIRA_AUTH=you@company.com:your-api-token
```

**Template settings:**

| Setting | Value |
|---------|-------|
| Auth Type | `basicAuth` |
| Auth Prefix | `Basic` |
| Secret Source | `env` |
| Credential | `JIRA_AUTH` |

### Jira Data Center (Bearer PAT)

Data Center uses Personal Access Tokens.

**Step 1:** Create a PAT: Profile > Personal Access Tokens > Create token

**Step 2:** Store the token:
```bash
JIRA_PAT=your-personal-access-token
```

**Template settings:**

| Setting | Value |
|---------|-------|
| Auth Type | `apiKeyHeader` (Bearer Token) |
| Auth Prefix | `Bearer` |
| Secret Source | `env` |
| Credential | `JIRA_PAT` |
| API URL | Change `/api/3/` to `/api/2/` |

### Secret Sources

The Credential field holds the **name** of the secret (not the value itself, unless using `variable`).

| Source | Setting | How It Resolves |
|--------|---------|----------------|
| Environment Variable | `env` | Reads env var `JIRA_AUTH` |
| Docker Secret File | `file` | Reads `/run/secrets/jira_auth` |
| Properties File | `properties` | Key `jira_auth` in `catalyst-secrets.properties` |
| Process Variable (dev) | `variable` | Literal value in the field (dev/testing only!) |

## Template Fields

### Visible Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Auth Type | Dropdown | `basicAuth` | Basic Auth (Cloud) or Bearer (DC) |
| Auth Prefix | String | `Basic` | `Basic` for Cloud, `Bearer` for DC |
| Secret Source | Dropdown | `env` | Where to resolve the credential |
| Credential | String | `JIRA_AUTH` | Name of the env var / secret |
| API Endpoint URL | String | `https://${jiraInstance}.atlassian.net/rest/api/3/issue/${jiraIssueKey}/comment` | Jira REST endpoint. Both `${jiraInstance}` and `${jiraIssueKey}` are process variables |
| Request Payload | Text | *(see Payload below)* | JSON body with comment content |
| Response Mapping | Text | *(maps id, self)* | Maps response to process variables |
| Error Mapping | Text | *(see Errors below)* | HTTP status to BPMN error codes |
| Timeout | String | `15` | Max wait in seconds |

### Hidden Fields (auto-configured)

| Field | Value |
|-------|-------|
| HTTP Method | `POST` |
| Headers | `Content-Type: application/json`, `Accept: application/json` |
| Auth Header | `Authorization` |
| Retry on 429 | `true` |
| Max Retries | `3` |

## Process Variables

These variables must be set before the service task executes (typically via a preceding user task form or an earlier Create Issue step):

| Variable | Example | Description |
|----------|---------|-------------|
| `jiraInstance` | `yourcompany` | Jira Cloud subdomain (yourcompany.atlassian.net) |
| `jiraIssueKey` | `PROJ-123` | The issue to comment on (often from a Create Issue output) |
| `commentText` | `Process completed successfully` | The comment body text |

## Payload

### API v3 (Jira Cloud)
Jira Cloud API v3 requires Atlassian Document Format (ADF). The default payload wraps your text in ADF automatically:
```json
{
  "body": {
    "type": "doc",
    "version": 1,
    "content": [
      {"type": "paragraph", "content": [{"type": "text", "text": "${commentText}"}]}
    ]
  }
}
```

### API v2 (Jira Data Center)
For API v2, replace the payload with a plain string body:
```json
{
  "body": "${commentText}"
}
```

### Rich ADF Comments
For formatted comments (bold, links, lists), build the ADF manually:
```json
{
  "body": {
    "type": "doc",
    "version": 1,
    "content": [
      {
        "type": "paragraph",
        "content": [
          {"type": "text", "text": "Process ", "marks": [{"type": "strong"}]},
          {"type": "text", "text": "${processName}"},
          {"type": "text", "text": " completed at step "},
          {"type": "text", "text": "${stepName}", "marks": [{"type": "code"}]}
        ]
      }
    ]
  }
}
```

## Response

Jira returns `201 Created` on success:
```json
{
  "id": "10501",
  "self": "https://yourcompany.atlassian.net/rest/api/3/issue/10042/comment/10501",
  "author": { "accountId": "...", "displayName": "..." },
  "body": { "...ADF content..." },
  "created": "2024-01-15T10:30:00.000+0000"
}
```

### Output Variables

| Variable | Example | Description |
|----------|---------|-------------|
| `jiraCommentId` | `10501` | Jira internal comment ID |
| `jiraCommentSelf` | `https://...` | Direct API URL to the comment |
| `catalyst_success` | `true` | Whether the call succeeded |
| `catalyst_statusCode` | `201` | HTTP status code |

## Error Handling

| HTTP Status | BPMN Error | Cause | Fix |
|-------------|------------|-------|-----|
| 400 | `INVALID_COMMENT` | Malformed comment body or bad ADF | Check JSON/ADF structure |
| 401 | `AUTH_FAILED` | Invalid credentials | Verify API token / PAT is correct and not expired |
| 403 | `PERMISSION_DENIED` | User lacks comment permission | Check Jira project permissions |
| 404 | `ISSUE_NOT_FOUND` | Issue key doesn't exist | Verify issue key |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff (3 attempts) |

Catch errors with a boundary error event on the service task. On any error, `catalyst_success` will be `false` and `catalyst_error` will contain the error message.

## Files

| File | Description |
|------|-------------|
| `jira-add-comment.element.json` | Element Template |
| `jira-add-comment-example.bpmn` | Standalone example process |

---
*Part of the Jira Connector Suite. See also: [Create Issue](../jira-create-issue/), [Update Issue](../jira-update-issue/), [Transition Issue](../jira-transition-issue/), [Lifecycle Example](../)*
