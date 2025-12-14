# DataIncidentManager Test Suite

Comprehensive test suite for validating documentation, configuration, and template files.

## Overview

This test suite validates:
- YAML configuration files (`.coderabbit.yaml`)
- Markdown documentation (README, CONTRIBUTING, SECURITY)
- GitHub templates (issue and PR templates)
- JSON test scenarios
- Image files
- Configuration files (`.gitignore`)

## Test Files

### 1. `validate_all.sh`
Shell-based validation script for quick checks.

```bash
bash tests/validate_all.sh
```

**Tests:**
- File existence checks
- Required sections in documentation
- Template completeness
- Configuration file validity

### 2. `test_documentation_files.py`
Comprehensive Python-based test suite.

```bash
python3 tests/test_documentation_files.py
```

**Tests:**
- YAML syntax and structure
- Markdown formatting and links
- Heading hierarchy
- Cross-references between files
- File-specific requirements

### 3. `validate_json_schemas.py`
JSON schema validator for test scenarios.

```bash
python3 tests/validate_json_schemas.py
```

**Tests:**
- JSON syntax validity
- Required field presence
- Data type validation
- Severity level validation

### 4. `run_all_tests.sh`
Master test runner that executes all test suites.

```bash
bash tests/run_all_tests.sh
```

## Running Tests

### Run All Tests
```bash
bash tests/run_all_tests.sh
```

### Run Individual Test Suites
```bash
# Shell validation
bash tests/validate_all.sh

# Python documentation tests
python3 tests/test_documentation_files.py

# JSON validation
python3 tests/validate_json_schemas.py
```

## Test Coverage

### Files Tested in Current Branch

Based on `git diff main..HEAD`, the following changed files are tested:

1. **`.coderabbit.yaml`**
   - YAML syntax validation
   - Required configuration fields
   - Tool enablement (shellcheck, yamllint, markdownlint)
   - Path instructions validation

2. **`.github/ISSUE_TEMPLATE/bug_report.md`**
   - Template existence
   - Required sections (Description, Reproduce, Environment)
   - Markdown formatting
   - Checklist presence

3. **`.github/ISSUE_TEMPLATE/feature_request.md`**
   - Template existence
   - Required sections (Description, Problem, Solution, Use Case)
   - Markdown formatting

4. **`.github/PULL_REQUEST_TEMPLATE.md`**
   - Template existence
   - Required sections (Description, Testing, Checklist)
   - Type of change options

5. **`.gitignore`**
   - File existence
   - Common patterns (.env, node_modules, etc.)
   - Formatting

6. **`CONTRIBUTING.md`**
   - Comprehensive content (>2000 chars)
   - Required sections (Code of Conduct, Setup, PR Process, Testing)
   - Cross-references to other docs

7. **`README.md`**
   - Essential sections (Installation, Usage, Contributing, License)
   - Badges present
   - Table of contents
   - Sufficient content

8. **`SECURITY.md`**
   - Vulnerability reporting instructions
   - Supported versions table
   - Security best practices
   - Contact information

9. **`public/DataIncidentManager.png`**
   - File existence
   - Valid PNG signature
   - Reasonable file size

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Documentation Tests

on: [push, pull_request]

jobs:
  test-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      - name: Run Test Suite
        run: bash tests/run_all_tests.sh
```

## Test Results Format

Tests output results in colored format:
- 🟢 **PASS**: Test passed successfully
- 🔴 **FAIL**: Test failed (blocks merge)
- 🟡 **WARN**: Warning (doesn't block merge)

## Adding New Tests

To add tests for new files:

1. **Shell validation** (`validate_all.sh`):
   ```bash
   if [ -f "new_file.md" ]; then
       pass_test "new_file.md exists"
   else
       fail_test "new_file.md" "File not found"
   fi
   ```

2. **Python tests** (`test_documentation_files.py`):
   ```python
   def test_new_file(results):
       file_path = Path('new_file.md')
       if file_path.exists():
           results.add_pass("new_file_exists")
       else:
           results.add_fail("new_file_exists", "File not found")
   ```

## Best Practices

1. **Run tests before committing**
   ```bash
   bash tests/run_all_tests.sh
   ```

2. **Fix all failures** before creating PR

3. **Address warnings** when possible

4. **Update tests** when adding new files

## Requirements

- **Python 3.6+** (no external dependencies)
- **Bash 4.0+**
- Standard Unix tools (grep, sed, file, wc)

## Troubleshooting

### "Python not found"
```bash
# Use python3 explicitly
python3 tests/test_documentation_files.py
```

### "Permission denied"
```bash
chmod +x tests/*.sh tests/*.py
```

### Tests fail on valid files
Check that you're running from repository root:
```bash
cd /path/to/DataIncidentManager
bash tests/run_all_tests.sh
```

## Contributing

When adding new documentation or configuration files:

1. Add corresponding tests to this suite
2. Run full test suite
3. Update this README if needed
4. Include test results in PR description

## License

Same as parent project (MIT License)