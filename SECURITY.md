# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in DataIncidentManager, please report it responsibly:

### 🔒 Private Disclosure Process

1. **Email**: Send details to the maintainers (create a security email or use GitHub Security Advisories)
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
3. **Response Time**: We aim to respond within 48 hours

### 📧 Contact

- **GitHub Security Advisories**: [Report a vulnerability](https://github.com/Suraj-kumar00/DataIncidentManager/security/advisories/new)
- **Maintainer**: Open a private issue or use GitHub's security advisory feature

### What to Expect

1. **Acknowledgment**: Within 48 hours
2. **Assessment**: Within 1 week
3. **Fix Development**: Depends on severity
4. **Coordinated Disclosure**: We'll work with you on disclosure timing

## Security Best Practices

### For Users

#### 1. API Key Management

**✅ DO:**
- Store API keys in `.env` file (gitignored)
- Use `encode_secrets.sh` for Kestra secrets
- Rotate keys regularly (quarterly recommended)
- Use different keys for dev/prod environments

**❌ DON'T:**
- Commit API keys to Git
- Hardcode keys in YAML files
- Share keys in public forums
- Reuse keys across projects

#### 2. Webhook Security

**Recommended:**
- Use webhook secrets for authentication
- Implement IP allowlisting for webhook endpoints
- Use HTTPS for webhook URLs in production
- Validate webhook payloads before processing

**Example (future enhancement):**
```yaml
# flows/triggers/alert_ingestion.yaml
triggers:
  - id: webhook_trigger
    type: io.kestra.core.models.triggers.types.Webhook
    conditions:
      - type: io.kestra.plugin.core.condition.ExpressionCondition
        expression: "{{ trigger.headers['X-Webhook-Secret'] == secret('WEBHOOK_SECRET') }}"
```

#### 3. Slack Webhook URLs

**Secure handling:**
- Never commit webhook URLs to Git
- Store in `.env` → encode with `encode_secrets.sh`
- Use `{{ secret('SLACK_WEBHOOK_URL') }}` in workflows
- Limit webhook permissions to single channel

#### 4. Docker Security

**Best practices:**
- Keep Docker images updated
- Don't run containers as root (future enhancement)
- Use Docker secrets for sensitive data
- Regularly scan images for vulnerabilities

```bash
# Check for vulnerabilities
docker scout cves kestra/kestra:latest
```

#### 5. Network Security

**Production deployment:**
- Use reverse proxy (nginx, Traefik) for Kestra
- Enable TLS/SSL for all endpoints
- Restrict network access with firewalls
- Use VPN for internal-only integrations

### For Contributors

#### 1. Code Security

**Before submitting PR:**
- [ ] No hardcoded credentials
- [ ] Input validation in place
- [ ] SQL injection prevention (if querying databases)
- [ ] XSS prevention in outputs
- [ ] CSRF protection (if adding web UI)

#### 2. Dependency Security

**Check dependencies:**
```bash
# For Python dependencies (if added)
pip-audit

# For Docker images
docker scout cves
```

#### 3. Secret Scanning

**Before commit:**
```bash
# Install git-secrets
brew install git-secrets

# Scan for secrets
git secrets --scan
```

## Known Security Considerations

### Current Architecture

1. **Simulated Integrations**: Current implementation simulates Snowflake/Airflow queries
   - **Risk**: Low (no real credentials used)
   - **Future**: When adding real integrations, use OAuth or short-lived tokens

2. **AI API Keys**: Perplexity API key has broad permissions
   - **Risk**: Medium (if compromised, could incur costs)
   - **Mitigation**: Use rate limiting, monitor usage, rotate keys

3. **Webhook Endpoint**: Currently no authentication
   - **Risk**: Medium (anyone can trigger workflows if URL known)
   - **Mitigation**: Add webhook secrets (planned enhancement)

4. **Slack Webhooks**: Incoming webhooks can't be revoked individually
   - **Risk**: Low (limited to posting messages)
   - **Mitigation**: Use Slack apps with OAuth for production

### Planned Security Enhancements

- [ ] Webhook secret authentication
- [ ] Rate limiting on webhook endpoint
- [ ] Audit logging for all executions
- [ ] Role-based access control (RBAC) for Kestra
- [ ] Encryption at rest for incident history (when added)

## Security Updates

We will publish security advisories for:
- **Critical**: Immediate disclosure + patch
- **High**: 30-day disclosure window
- **Medium/Low**: Regular release cycle

### How to Stay Updated

- Watch this repository for security advisories
- Check releases for security fix notes
- Subscribe to GitHub security notifications

## Responsible Disclosure

We appreciate security researchers and users who report vulnerabilities responsibly. We commit to:

1. **Acknowledge** your report promptly
2. **Keep you informed** of our progress
3. **Credit you** in advisory (if desired)
4. **Work with you** on disclosure timing

## Compliance

### Data Privacy

DataIncidentManager:
- Does **NOT** store alert data persistently (stateless by default)
- Sends data to:
  - Perplexity AI API (for analysis)
  - Slack webhooks (if configured)
- Logs execution data in Kestra (can be purged)

### GDPR Considerations

If processing EU data:
- Alert data is transient (not stored long-term)
- Kestra logs can be configured for data retention
- AI API providers (Perplexity) may process data - review their privacy policy

## Security Checklist for Production

Before deploying to production:

### Infrastructure
- [ ] Use HTTPS for all endpoints
- [ ] Enable firewall rules
- [ ] Implement network segmentation
- [ ] Use VPN for internal access
- [ ] Set up monitoring/alerting

### Authentication
- [ ] Add webhook authentication
- [ ] Implement API key rotation
- [ ] Use OAuth where possible
- [ ] Enable MFA for all accounts

### Monitoring
- [ ] Log all executions
- [ ] Monitor for unusual API usage
- [ ] Alert on authentication failures
- [ ] Track webhook source IPs

### Data Protection
- [ ] Encrypt secrets at rest
- [ ] Use TLS in transit
- [ ] Implement backup strategy
- [ ] Define data retention policy

### Compliance
- [ ] Review data processing agreements
- [ ] Document data flows
- [ ] Establish incident response plan
- [ ] Conduct security audit

---

## Questions?

For security-related questions: 
- Check this document first
- Open a private security advisory
- Contact maintainers directly

**Remember**: Security is everyone's responsibility. If you see something, say something!
