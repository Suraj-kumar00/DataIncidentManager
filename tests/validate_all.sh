#!/bin/bash
set -euo pipefail

echo "================================================"
echo "DataIncidentManager - File Validation Suite"
echo "================================================"
echo ""

PASS=0
FAIL=0
WARN=0

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

pass_test() {
    echo -e "${GREEN}✓ PASS${NC}: $1"
    ((PASS++))
}

fail_test() {
    echo -e "${RED}✗ FAIL${NC}: $1"
    echo -e "  ${RED}$2${NC}"
    ((FAIL++))
}

warn_test() {
    echo -e "${YELLOW}⚠ WARN${NC}: $1"
    echo -e "  ${YELLOW}$2${NC}"
    ((WARN++))
}

echo -e "${BLUE}=== Testing YAML Files ===${NC}"

# Test .coderabbit.yaml
if [ -f ".coderabbit.yaml" ]; then
    pass_test ".coderabbit.yaml exists"
    
    # Check for required fields
    if grep -q "language:" .coderabbit.yaml; then
        pass_test ".coderabbit.yaml has language field"
    else
        fail_test ".coderabbit.yaml" "Missing language field"
    fi
    
    if grep -q "reviews:" .coderabbit.yaml; then
        pass_test ".coderabbit.yaml has reviews configuration"
    else
        fail_test ".coderabbit.yaml" "Missing reviews configuration"
    fi
    
    # Check for tools configuration
    if grep -q "shellcheck:" .coderabbit.yaml && grep -q "enabled: true" .coderabbit.yaml; then
        pass_test ".coderabbit.yaml enables shellcheck"
    fi
    
    if grep -q "yamllint:" .coderabbit.yaml; then
        pass_test ".coderabbit.yaml enables yamllint"
    fi
    
    if grep -q "markdownlint:" .coderabbit.yaml; then
        pass_test ".coderabbit.yaml enables markdownlint"
    fi
else
    fail_test ".coderabbit.yaml" "File not found"
fi

echo ""
echo -e "${BLUE}=== Testing Markdown Files ===${NC}"

# Test README.md
if [ -f "README.md" ]; then
    pass_test "README.md exists"
    
    # Check size
    size=$(wc -c < README.md)
    if [ "$size" -gt 1000 ]; then
        pass_test "README.md has sufficient content ($size bytes)"
    else
        warn_test "README.md" "Content seems short ($size bytes)"
    fi
    
    # Check for essential sections
    if grep -qi "installation" README.md; then
        pass_test "README.md has Installation section"
    fi
    
    if grep -qi "usage" README.md; then
        pass_test "README.md has Usage section"
    fi
    
    if grep -qi "contributing" README.md; then
        pass_test "README.md references Contributing"
    fi
    
    if grep -qi "license" README.md; then
        pass_test "README.md has License section"
    fi
    
    # Check for badges
    if grep -q "!\[" README.md || grep -q "badge" README.md; then
        pass_test "README.md contains badges"
    fi
else
    fail_test "README.md" "File not found"
fi

# Test CONTRIBUTING.md
if [ -f "CONTRIBUTING.md" ]; then
    pass_test "CONTRIBUTING.md exists"
    
    size=$(wc -c < CONTRIBUTING.md)
    if [ "$size" -gt 2000 ]; then
        pass_test "CONTRIBUTING.md has comprehensive content ($size bytes)"
    fi
    
    if grep -qi "code of conduct" CONTRIBUTING.md; then
        pass_test "CONTRIBUTING.md references Code of Conduct"
    fi
    
    if grep -qi "development setup" CONTRIBUTING.md; then
        pass_test "CONTRIBUTING.md has Development Setup"
    fi
    
    if grep -qi "pull request" CONTRIBUTING.md; then
        pass_test "CONTRIBUTING.md has PR guidelines"
    fi
else
    fail_test "CONTRIBUTING.md" "File not found"
fi

# Test SECURITY.md
if [ -f "SECURITY.md" ]; then
    pass_test "SECURITY.md exists"
    
    if grep -qi "reporting" SECURITY.md && grep -qi "vulnerability" SECURITY.md; then
        pass_test "SECURITY.md has vulnerability reporting info"
    fi
    
    if grep -qi "supported versions" SECURITY.md; then
        pass_test "SECURITY.md lists supported versions"
    fi
else
    fail_test "SECURITY.md" "File not found"
fi

echo ""
echo -e "${BLUE}=== Testing GitHub Templates ===${NC}"

# Test issue templates
if [ -d ".github/ISSUE_TEMPLATE" ]; then
    pass_test ".github/ISSUE_TEMPLATE directory exists"
    
    if [ -f ".github/ISSUE_TEMPLATE/bug_report.md" ]; then
        pass_test "Bug report template exists"
        if grep -qi "to reproduce" .github/ISSUE_TEMPLATE/bug_report.md; then
            pass_test "Bug report has 'To Reproduce' section"
        fi
    else
        fail_test "Bug report template" "File not found"
    fi
    
    if [ -f ".github/ISSUE_TEMPLATE/feature_request.md" ]; then
        pass_test "Feature request template exists"
        if grep -qi "solution" .github/ISSUE_TEMPLATE/feature_request.md; then
            pass_test "Feature request has 'Solution' section"
        fi
    else
        fail_test "Feature request template" "File not found"
    fi
else
    fail_test ".github/ISSUE_TEMPLATE" "Directory not found"
fi

# Test PR template
if [ -f ".github/PULL_REQUEST_TEMPLATE.md" ]; then
    pass_test "PR template exists"
    
    if grep -qi "description" .github/PULL_REQUEST_TEMPLATE.md; then
        pass_test "PR template has Description section"
    fi
    
    if grep -qi "checklist" .github/PULL_REQUEST_TEMPLATE.md; then
        pass_test "PR template has Checklist"
    fi
    
    if grep -qi "testing" .github/PULL_REQUEST_TEMPLATE.md; then
        pass_test "PR template has Testing section"
    fi
else
    fail_test "PR template" "File not found"
fi

echo ""
echo -e "${BLUE}=== Testing Configuration Files ===${NC}"

# Test .gitignore
if [ -f ".gitignore" ]; then
    pass_test ".gitignore exists"
    
    if grep -q ".env" .gitignore; then
        pass_test ".gitignore includes .env files"
    fi
    
    if grep -q "node_modules" .gitignore || grep -q "__pycache__" .gitignore; then
        pass_test ".gitignore includes build artifacts"
    fi
else
    fail_test ".gitignore" "File not found"
fi

echo ""
echo -e "${BLUE}=== Testing Image Files ===${NC}"

# Test banner image
if [ -f "public/DataIncidentManager.png" ]; then
    pass_test "Banner image exists"
    
    size=$(wc -c < public/DataIncidentManager.png)
    if [ "$size" -gt 0 ]; then
        pass_test "Image file is not empty ($size bytes)"
    else
        fail_test "Image file" "File is empty"
    fi
    
    # Check PNG signature
    if file public/DataIncidentManager.png | grep -q "PNG"; then
        pass_test "Valid PNG image format"
    else
        warn_test "Image format" "May not be a valid PNG"
    fi
else
    fail_test "Banner image" "File not found"
fi

echo ""
echo "================================================"
echo -e "Test Summary: ${GREEN}$PASS passed${NC}, ${RED}$FAIL failed${NC}"
if [ "$WARN" -gt 0 ]; then
    echo -e "Warnings: ${YELLOW}$WARN${NC}"
fi
echo "================================================"

if [ "$FAIL" -gt 0 ]; then
    exit 1
else
    exit 0
fi