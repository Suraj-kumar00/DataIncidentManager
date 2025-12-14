# Contributing to DataIncidentManager

First off, thank you for considering contributing to DataIncidentManager! 🎉

DataIncidentManager is an open-source AI-powered incident management system for data teams. We welcome contributions from developers, data engineers, SREs, and anyone passionate about improving data operations.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

---

## Code of Conduct

This project adheres to the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers.

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Environment details** (Docker version, OS, Kestra version)
- **Logs or error messages** (if applicable)
- **Test scenario** that reproduces the issue

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide detailed description** of the proposed functionality
- **Explain why this enhancement would be useful** to most users
- **List any alternative solutions** you've considered

### Contributing Code

We love pull requests! Here are areas where contributions are especially welcome:

1. **New Integrations**
   - Additional monitoring systems (Datadog, New Relic, Splunk)
   - Data platforms (BigQuery, Redshift, Databricks)
   - Notification channels (MS Teams, PagerDuty, Opsgenie)

2. **AI Agent Improvements**
   - Enhanced prompts for better decision-making
   - Additional AI providers
   - Improved context gathering

3. **Auto-Remediation Workflows**
   - New remediation patterns (restart services, rollback changes)
   - Pre/post validation checks
   - Rollback mechanisms

4. **Testing & Quality**
   - Additional test scenarios
   - Unit tests for Python scripts
   - Integration tests
   - Performance tests

5. **Documentation**
   - Tutorials and how-to guides
   - Architecture deep-dives
   - Deployment guides
   - Video walkthroughs

---

## Development Setup

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) & Docker Compose
- [Git](https://git-scm.com/)
- [Perplexity API Key](https://www.perplexity.ai/settings/api) (free tier available)
- Slack Webhook URL (optional, for testing notifications)

### Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork:
git clone https://github.com/YOUR_USERNAME/DataIncidentManager.git
cd DataIncidentManager

# Add upstream remote
git remote add upstream https://github.com/Suraj-kumar00/DataIncidentManager.git
```

### Local Setup

```bash
# 1. Configure environment
cp .env.example .env
# Edit .env and add your API keys

# 2. Encode secrets
./encode_secrets.sh

# 3. Start Kestra
docker-compose up -d

# 4. Verify Kestra is running
docker ps

# 5. Access Kestra UI
open http://localhost:8080
```

### Deploy Flows

Flows must be manually deployed via Kestra UI:

1. Open http://localhost:8080
2. Navigate to **Flows** → **+ Create**
3. Copy content from YAML files in `flows/` directory
4. Paste into Kestra editor and **Save**

Deploy these flows in order:
1. `flows/triggers/alert_ingestion.yaml`
2. `flows/agents/incident_analyzer.yaml`
3. `flows/actions/notify_slack.yaml`
4. `flows/actions/auto_remediate.yaml`

### Running Tests

```bash
# Run basic test scenarios
./test_all.sh

# Run enhanced production-grade scenarios
./test_all_enhanced.sh
```

View test results:
- Kestra UI: http://localhost:8080/executions
- Slack channel (if configured)

---

## Pull Request Process

### Before You Start

1. **Search for existing issues** - Someone might already be working on it
2. **Create an issue** - Discuss larger changes before implementing
3. **Fork the repository** - Work in your own fork
4. **Create a branch** - Use descriptive branch names

### Branch Naming Convention

```bash
# Feature branches
git checkout -b feat/add-datadog-integration

# Bug fix branches  
git checkout -b fix/webhook-parsing-error

# Documentation branches
git checkout -b docs/improve-setup-guide

# Refactoring branches
git checkout -b refactor/simplify-ai-prompts
```

### Making Changes

1. **Keep changes focused** - One feature/fix per PR
2. **Write clear commit messages** - Follow [Conventional Commits](https://www.conventionalcommits.org/)
3. **Test your changes** - Ensure all tests pass
4. **Update documentation** - Document new features

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(flows): add Datadog integration for alert ingestion

- Add new flow for Datadog webhook handling
- Parse Datadog alert format
- Map to standardized alert schema

Closes #42

fix(slack): correct JSON escaping in notification formatting

Previously, special characters in AI analysis were breaking 
Slack message formatting. Now properly escape JSON strings.

Fixes #38

docs(readme): add Snowflake integration guide

Added step-by-step guide for connecting Snowflake API
to context gathering tasks.
```

### Submitting Pull Request

1. **Update from upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**
   ```bash
   git push origin your-branch-name
   ```

3. **Create Pull Request on GitHub**
   - Use our [PR template](.github/PULL_REQUEST_TEMPLATE.md)
   - Link related issues
   - Add screenshots/demos if applicable

4. **Code Review Process**
   - **CodeRabbit** will auto-review within minutes
   - Address CodeRabbit suggestions
   - Maintainers will review
   - Make requested changes
   - Get approval and merge!

### PR Review Checklist

Before requesting review, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass (`./test_all.sh`)
- [ ] New tests added for new functionality
- [ ] Documentation updated (README, inline comments)
- [ ] Commit messages follow conventions
- [ ] No merge conflicts with `main`
- [ ] CodeRabbit review passed
- [ ] CHANGELOG updated (if applicable)

---

## Coding Standards

### Kestra Workflows (YAML)

```yaml
# Good: Clear task naming, proper error handling
- id: parse_alert
  type: io.kestra.plugin.scripts.python.Script
  script: |
    import json
    try:
        alert = json.loads("""{{ inputs.alert_payload }}""")
        print(f"✓ Parsed alert: {alert.get('alert_id')}")
    except json.JSONDecodeError as e:
        print(f"❌ JSON parse error: {e}")
        raise

# Bad: Unclear naming, no error handling
- id: task1
  type: io.kestra.plugin.scripts.python.Script
  script: |
    alert = json.loads("""{{ inputs.data }}""")
```

**Best Practices:**
- Use descriptive task IDs (`parse_alert` not `task_1`)
- Add error handling to scripts
- Use `outputFiles` for passing complex data
- Comment complex logic
- Validate inputs before use
- Use secrets for sensitive data: `{{ secret('KEY_NAME') }}`

### Shell Scripts

```bash
# Good: Proper error handling
#!/bin/bash
set -euo pipefail  # Exit on error, undefined vars, pipe failures

KESTRA_URL="${KESTRA_URL:-http://localhost:8080}"

if [[ ! -f "test_scenarios/schema_drift.json" ]]; then
    echo "Error: Test file not found" >&2
    exit 1
fi

curl -X POST "${KESTRA_URL}/api/v1/executions/webhook/..." \
    -H "Content-Type: application/json" \
    -d @test_scenarios/schema_drift.json

# Bad: No error handling
#!/bin/bash
curl -X POST http://localhost:8080/... -d @file.json
```

**Best Practices:**
- Use `set -euo pipefail`
- Quote variables: `"${VAR}"`
- Check file existence before use
- Provide meaningful error messages
- Use shellcheck: `shellcheck script.sh`

### Python (in Kestra tasks)

```python
# Good: Type hints, error handling, logging
from typing import Dict, Any
import json

def parse_alert(payload: str) -> Dict[str, Any]:
    """Parse incoming alert payload into standardized format."""
    try:
        alert = json.loads(payload)
        
        # Validate required fields
        required = ['alert_id', 'severity', 'source']
        for field in required:
            if field not in alert:
                raise ValueError(f"Missing required field: {field}")
        
        print(f"✓ Parsed alert {alert['alert_id']} from {alert['source']}")
        return alert
        
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON: {e}")
        raise
    except Exception as e:
        print(f"❌ Parse error: {e}")
        raise

# Bad: No typing, error handling, or validation
def parse(p):
    return json.loads(p)
```

**Best Practices:**
- Add type hints
- Validate inputs
- Handle exceptions explicitly
- Use descriptive variable names
- Add docstrings for complex functions
- Log progress and errors

### Documentation (Markdown)

- Use proper headings hierarchy (H1 → H2 → H3)
- Include code examples with syntax highlighting
- Add links to related documentation
- Keep lines under 120 characters
- Use tables for comparisons
- Add emojis sparingly for clarity (✅ ❌ 🔥)

---

## Testing Guidelines

### Test Scenarios

Test scenarios are JSON files in `test_scenarios/` directory.

**Good test scenario:**
```json
{
  "alert_id": "TEST-INTEGRATION-001",
  "timestamp": "2025-12-14T10:00:00Z",
  "source": "test_runner",
  "severity": "high",
  "title": "Integration test: Snowflake connection timeout",
  "description": "Simulated Snowflake timeout for testing error handling",
  "metric": {
    "database": "TEST_DB",
    "timeout_seconds": 30
  }
}
```

**Requirements for test scenarios:**
- Unique `alert_id` with prefix indicating test type
- Realistic data mimicking production alerts
- Clear `description` explaining test purpose
- Include relevant `metric` data for AI analysis

### Running Tests

```bash
# Run all basic tests
./test_all.sh

# Run enhanced production-grade tests
./test_all_enhanced.sh

# Run specific test
curl -X POST http://localhost:8080/api/v1/executions/webhook/incident_management/alert_ingestion/alert_webhook \
  -H "Content-Type: application/json" \
  -d @test_scenarios/your_test.json
```

### Adding New Tests

1. Create test scenario JSON in `test_scenarios/`
2. Add test to `test_all.sh` or `test_all_enhanced.sh`
3. Document expected behavior
4. Verify test passes before PR

---

## Documentation

### What to Document

- **New features** - How to use, configuration options
- **Breaking changes** - Migration guide
- **Bug fixes** - What was broken, how it's fixed
- **Configuration** - New environment variables or settings
- **API changes** - Updated endpoints or parameters

### Where to Document

- **README.md** - High-level overview, quick start
- **Inline comments** - Complex logic, non-obvious code
- **Docstrings** - Function/class documentation (Python)
- **CHANGELOG.md** - Version history, changes
- **Separate guides** - Tutorials, how-tos (add to `Docs/`)

### Documentation Style

- Use clear, concise language
- Include examples
- Link to related docs
- Keep updated with code changes
- Test all commands/code examples

---

## Questions?

- **General questions:** Open a [GitHub Discussion](https://github.com/Suraj-kumar00/DataIncidentManager/discussions)
- **Bug reports:** Create an [Issue](https://github.com/Suraj-kumar00/DataIncidentManager/issues)
- **Security concerns:** See [SECURITY.md](SECURITY.md)

---

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for their contributions
- GitHub contributor graph

Thank you for contributing to DataIncident Manager! Together, we're making data operations more reliable and less stressful for teams worldwide. 🚀
