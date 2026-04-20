# Catalyst Connector: Jira Update Issue
Update fields on an existing Jira issue — change summary, priority, assignee, labels, and more.

**API:** `PUT /rest/api/{v}/issue/{key}`
**Auth:** Basic Auth (Cloud) or Bearer PAT (Data Center)
**Response:** `204 No Content` (use `catalyst_success` to verify)

## Quick Start

1. Generate a Jira API token (Cloud) or Personal Access Token (Data Center)
2. Store the credential as an environment variable (see Authentication below)
3. Apply the **Catalyst - Jira Update Issue** template to a Service Task
4. Set your Jira instance name, issue key, and fields to update
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
| API Endpoint URL | String | `https://${jiraInstance}.atlassian.net/rest/api/3/issue/${jiraIssueKey}` | Jira REST endpoint. Both `${jiraInstance}` and `${jiraIssueKey}` are process variables |
| Update Payload | Text | *(see Payload below)* | JSON body with fields to change |
| Error Mapping | Text | *(see Errors below)* | HTTP status to BPMN error codes |
| Timeout | String | `15` | Max wait in seconds |

### Hidden Fields (auto-configured)

| Field | Value |
|-------|-------|
| HTTP Method | `PUT` |
| Headers | `Content-Type: application/json`, `Accept: application/json` |
| Auth Header | `Authorization` |
| Response Mapping | `{}` (204 No Content — no body) |
| Retry on 429 | `true` |
| Max Retries | `3` |

## Process Variables

These variables must be set before the service task executes (typically via a preceding user task form or an earlier Create Issue step):

| Variable | Example | Description |
|----------|---------|-------------|
| `jiraInstance` | `yourcompany` | Jira Cloud subdomain (yourcompany.atlassian.net) |
| `jiraIssueKey` | `PROJ-123` | The issue to update (often from a Create Issue output) |
| `updatedSummary` | `New title` | New summary text |
| `updatedPriority` | `High` | New priority |
| `updatedLabels` | `catalyst,updated` | New labels (comma-separated) |

## Payload

Only include the fields you want to change — omitted fields are left untouched.

### Default Payload
```json
{
  "fields": {
    "summary": "${updatedSummary}",
    "priority": {"name": "${updatedPriority}"},
    "labels": ["${updatedLabels}"]
  }
}
```

### Common Update Patterns

**Change assignee:**
```json
{
  "fields": {
    "assignee": {"accountId": "${assigneeAccountId}"}
  }
}
```

**Add labels without removing existing ones** (use the `update` syntax instead of `fields`):
```json
{
  "update": {
    "labels": [{"add": "catalyst"}, {"add": "escalated"}]
  }
}
```

**Change status + fields together:** Use the [Transition Issue](../jira-transition-issue/) connector to change status. The Update Issue connector changes field values only — it cannot change workflow status.

## Response

Jira returns `204 No Content` on success — there is no response body.

### Output Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `catalyst_success` | `true` | Whether the call succeeded |
| `catalyst_statusCode` | `204` | HTTP status code |

## Error Handling

| HTTP Status | BPMN Error | Cause | Fix |
|-------------|------------|-------|-----|
| 400 | `INVALID_FIELDS` | Invalid field names or values | Check field names and value formats |
| 401 | `AUTH_FAILED` | Invalid credentials | Verify API token / PAT is correct and not expired |
| 403 | `PERMISSION_DENIED` | User lacks edit permission | Check Jira project permissions |
| 404 | `ISSUE_NOT_FOUND` | Issue key doesn't exist | Verify issue key |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff (3 attempts) |

Catch errors with a boundary error event on the service task. On any error, `catalyst_success` will be `false` and `catalyst_error` will contain the error message.

## Files

| File | Description |
|------|-------------|
| `jira-update-issue.element.json` | Element Template |
| `jira-update-issue-example.bpmn` | Standalone example process |

---
*Part of the Jira Connector Suite. See also: [Create Issue](../jira-create-issue/), [Add Comment](../jira-add-comment/), [Transition Issue](../jira-transition-issue/), [Lifecycle Example](../)*
