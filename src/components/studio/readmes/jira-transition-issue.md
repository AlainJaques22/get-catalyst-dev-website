# Catalyst Connector: Jira Transition Issue
Transition a Jira issue to a new status — move issues through your workflow (e.g. To Do > In Progress > Done).

**API:** `POST /rest/api/{v}/issue/{key}/transitions`
**Auth:** Basic Auth (Cloud) or Bearer PAT (Data Center)
**Response:** `204 No Content` (use `catalyst_success` to verify)

## Quick Start

1. Generate a Jira API token (Cloud) or Personal Access Token (Data Center)
2. Store the credential as an environment variable (see Authentication below)
3. Look up the transition IDs for your project (see Finding Transition IDs below)
4. Apply the **Catalyst - Jira Transition Issue** template to a Service Task
5. Set your Jira instance name, issue key, and transition ID
6. Deploy and run

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

## Finding Transition IDs

Transition IDs are **project-specific** — they differ between projects and workflow schemes. You must look them up before using the connector.

Query available transitions for any issue:
```bash
curl -u you@example.com:your_api_token \
  https://yourcompany.atlassian.net/rest/api/3/issue/PROJ-123/transitions \
  | jq '.transitions[] | {id, name}'
```

Example response:
```json
{"id": "11", "name": "To Do"}
{"id": "21", "name": "In Progress"}
{"id": "31", "name": "Done"}
```

Use the `id` value in the connector's payload. The IDs above are common defaults but yours **will** vary — always check your specific project.

## Template Fields

### Visible Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Auth Type | Dropdown | `basicAuth` | Basic Auth (Cloud) or Bearer (DC) |
| Auth Prefix | String | `Basic` | `Basic` for Cloud, `Bearer` for DC |
| Secret Source | Dropdown | `env` | Where to resolve the credential |
| Credential | String | `JIRA_AUTH` | Name of the env var / secret |
| API Endpoint URL | String | `https://${jiraInstance}.atlassian.net/rest/api/3/issue/${jiraIssueKey}/transitions` | Jira REST endpoint. Both `${jiraInstance}` and `${jiraIssueKey}` are process variables |
| Request Payload | Text | *(see Payload below)* | JSON body with transition ID |
| Error Mapping | Text | *(see Errors below)* | HTTP status to BPMN error codes |
| Timeout | String | `15` | Max wait in seconds |

### Hidden Fields (auto-configured)

| Field | Value |
|-------|-------|
| HTTP Method | `POST` |
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
| `jiraIssueKey` | `PROJ-123` | The issue to transition (often from a Create Issue output) |
| `transitionId` | `31` | The target transition ID (see Finding Transition IDs above) |

## Payload

### Default Payload
```json
{
  "transition": {
    "id": "${transitionId}"
  }
}
```

### Transition with Comment
Add a comment during the transition (API v3 ADF format):
```json
{
  "transition": {
    "id": "${transitionId}"
  },
  "update": {
    "comment": [
      {
        "add": {
          "body": {
            "type": "doc",
            "version": 1,
            "content": [
              {"type": "paragraph", "content": [{"type": "text", "text": "Automatically transitioned by Catalyst process."}]}
            ]
          }
        }
      }
    ]
  }
}
```

### Transition with Field Updates
Change fields at the same time as the transition:
```json
{
  "transition": {
    "id": "${transitionId}"
  },
  "fields": {
    "assignee": {"accountId": "${assigneeAccountId}"},
    "resolution": {"name": "Done"}
  }
}
```

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
| 400 | `INVALID_TRANSITION` | Transition ID not valid for current issue status | Check available transitions for this issue's current state |
| 401 | `AUTH_FAILED` | Invalid credentials | Verify API token / PAT is correct and not expired |
| 403 | `PERMISSION_DENIED` | User lacks transition permission | Check Jira project permissions |
| 404 | `ISSUE_NOT_FOUND` | Issue key doesn't exist | Verify issue key |
| 409 | `TRANSITION_CONFLICT` | Concurrent modification conflict | Retry the transition |
| 429 | `RATE_LIMITED` | Too many requests | Auto-retried with backoff (3 attempts) |

Catch errors with a boundary error event on the service task. On any error, `catalyst_success` will be `false` and `catalyst_error` will contain the error message.

**Common gotcha:** A `400 INVALID_TRANSITION` usually means the transition ID you provided is not available from the issue's **current** status. Jira workflows are directional — you can only transition to statuses reachable from the current one. Re-run the transitions lookup for the specific issue to see what's available.

## Files

| File | Description |
|------|-------------|
| `jira-transition-issue.element.json` | Element Template |
| `jira-transition-issue-example.bpmn` | Standalone example process |

---
*Part of the Jira Connector Suite. See also: [Create Issue](../jira-create-issue/), [Update Issue](../jira-update-issue/), [Add Comment](../jira-add-comment/), [Lifecycle Example](../)*
