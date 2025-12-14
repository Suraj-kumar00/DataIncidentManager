#!/bin/bash
set -e

echo "================================================"
echo "DataIncidentManager - Master Test Suite"
echo "================================================"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

EXIT_CODE=0

# Run shell-based validation
echo -e "${BLUE}[1/3] Running Shell-Based Validation...${NC}"
if bash tests/validate_all.sh; then
    echo -e "${GREEN}✓ Shell validation passed${NC}\n"
else
    echo -e "${RED}✗ Shell validation failed${NC}\n"
    EXIT_CODE=1
fi

# Run Python documentation tests
echo -e "${BLUE}[2/3] Running Python Documentation Tests...${NC}"
if python3 tests/test_documentation_files.py; then
    echo -e "${GREEN}✓ Documentation tests passed${NC}\n"
else
    echo -e "${RED}✗ Documentation tests failed${NC}\n"
    EXIT_CODE=1
fi

# Run JSON schema validation
echo -e "${BLUE}[3/3] Running JSON Schema Validation...${NC}"
if python3 tests/validate_json_schemas.py; then
    echo -e "${GREEN}✓ JSON validation passed${NC}\n"
else
    echo -e "${RED}✗ JSON validation failed${NC}\n"
    EXIT_CODE=1
fi

echo "================================================"
if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
else
    echo -e "${RED}Some tests failed${NC}"
fi
echo "================================================"

exit $EXIT_CODE