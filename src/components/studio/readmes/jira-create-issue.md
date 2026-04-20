# Catalyst Connector: Jira Create Issue
Create an issue in Jira Cloud or Data Center from your Camunda 7 process.

**API:** `POST /rest/api/{v}/issue`
**Auth:** Basic Auth (Cloud) or Bearer PAT (Data Center)
**Response:** `201 Created` with issue key, ID, and self link

## Quick Start

1. Generate a Jira API token (Cloud) or Personal Access Token (Data Center)
2. Store the credential as an environment variable (see Authentication below)
3. Apply the **Catalyst - Jira Create Issue** template to a Service Task
4. Set your Jira instance name, project key, and issue details
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
| API Endpoint URL | String | `https://${jiraInstance}.atlassian.net/rest/api/3/issue` | Jira REST endpoint. `${jiraInstance}` is a process variable |
| Request Payload | Text | *(see Payload below)* | JSON body with issue fields |
| Response Mapping | Text | *(maps key, id, self)* | Maps response to process variables |
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

These variables must be set before the service task executes (typically via a preceding user task form):

| Variable | Example | Description |
|----------|---------|-------------|
| `jiraInstance` | `yourcompany` | Jira Cloud subdomain (yourcompany.atlassian.net) |
| `jiraProjectKey` | `PROJ` | Target project key |
| `jiraIssueType` | `Task` | Issue type: Task, Bug, Story, Epic, Sub-task |
| `issueSummary` | `Process exception` | Issue title |
| `issueDescription` | `Details here...` | Issue body text |
| `jiraPriority` | `Medium` | Priority: Highest, High, Medium, Low, Lowest |

## Payload

### API v3 (Jira Cloud)
```json
{
  "fields": {
    "project": {"key": "${jiraProjectKey}"},
    "issuetype": {"name": "${jiraIssueType}"},
    "summary": "${issueSummary}",
    "description": {
      "type": "doc",
      "version": 1,
      "content": [
        {"type": "paragraph", "content": [{"type": "text", "text": "${issueDescription}"}]}
      ]
    },
    "priority": {"name": "${jiraPriority}"}
  }
}
```

### API v2 (Jira Data Center)
Replace the description object with a plain string:
```json
{
  "fields": {
    "project": {"key": "${jiraProjectKey}"},
    "issuetype": {"name": "${jiraIssueType}"},
    "summary": "${issueSummary}",
    "description": "${issueDescription}",
    "priority": {"name": "${jiraPriority}"}
  }
}
```

### Custom Fields
For custom fields, components, or fix versions, edit the payload directly:
```json
{
  "fields": {
    "project": {"key": "PROJ"},
    "issuetype": {"name": "Bug"},
    "summary": "${issueSummary}",
    "description": {
      "type": "doc", "version": 1,
      "content": [{"type": "paragraph", "content": [{"type": "text", "text": "${issueDescription}"}]}]
    },
    "priority": {"name": "High"},
    "labels": ["catalyst", "automated"],
    "components": [{"name": "Backend"}],
    "customfield_10001": "custom value"
  }
}
```

## Response

Jira returns `201 Created` on success:
```json
{
  "id": "10042",
  "key": "PROJ-123",
  "self": "https://yourcompany.atlassian.net/rest/api/3/issue/10042"
}
```

### Output Variables

| Variable | Example | Description |
|----------|---------|-------------|
| `jiraIssueKey` | `PROJ-123` | Human-readable issue key |
| `jiraIssueId` | `10042` | Jira internal issue ID |
| `jiraIssueSelf` | `https://...` | Direct API URL to the issue |
| `catalyst_success` | `true` | Whether the call succeeded |
| `catalyst_statusCode` | `201` | HTTP status code |

## Error Handling

| HTTP Status | BPMN Error | Cause | Fix |
|-------------|------------|-------|-----|
| 400 | `INVALID_FIELDS` | Missing or invalid fields | Check project key, issue type, required fields |
| 401 | `AUTH_FAILED` | Invalid credentials | Verify API token / PAT is correct and not expired |
| 403 | `PERMISSION_DENIED` | User lacks create permission | Check Jira project permissions |
| 404 | `PROJECT_NOT_FOUND` | Project key doesn't exist | Verify project key |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff (3 attempts) |

Catch errors with a boundary error event on the service task. The error code matches the BPMN Error column above. On any error, `catalyst_success` will be `false` and `catalyst_error` will contain the error message.

## Files

| File | Description |
|------|-------------|
| `jira-create-issue.element.json` | Element Template |
| `jira-create-issue-example.bpmn` | Standalone example process |

---
*Part of the Jira Connector Suite. See also: [Update Issue](../jira-update-issue/), [Add Comment](../jira-add-comment/), [Transition Issue](../jira-transition-issue/), [Lifecycle Example](../)*
