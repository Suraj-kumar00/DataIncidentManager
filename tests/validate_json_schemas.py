#!/usr/bin/env python3
"""
JSON Schema Validator for Test Scenarios
Validates all JSON test scenario files
"""

import json
import sys
from pathlib import Path

class Colors:
    GREEN = '\033[0;32m'
    RED = '\033[0;31m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    NC = '\033[0m'

def validate_json_file(filepath):
    """Validate a single JSON file"""
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
        return True, data, None
    except json.JSONDecodeError as e:
        return False, None, str(e)
    except Exception as e:
        return False, None, str(e)

def validate_test_scenario_schema(data, filename):
    """Validate test scenario has required fields"""
    required_fields = ['alert_id', 'timestamp', 'source', 'severity', 'description']
    missing = []
    
    for field in required_fields:
        if field not in data:
            missing.append(field)
    
    return missing

def main():
    print(f"{Colors.BLUE}{'='*70}{Colors.NC}")
    print(f"{Colors.BLUE}JSON Test Scenario Validator{Colors.NC}")
    print(f"{Colors.BLUE}{'='*70}{Colors.NC}\n")
    
    passed = 0
    failed = 0
    
    test_dir = Path('test_scenarios')
    if not test_dir.exists():
        print(f"{Colors.RED}✗ test_scenarios directory not found{Colors.NC}")
        return 1
    
    json_files = list(test_dir.glob('*.json'))
    if not json_files:
        print(f"{Colors.YELLOW}⚠ No JSON files found in test_scenarios/{Colors.NC}")
        return 0
    
    print(f"Found {len(json_files)} JSON files to validate\n")
    
    for json_file in sorted(json_files):
        print(f"Testing: {json_file.name}")
        
        # Test 1: Valid JSON syntax
        valid, data, error = validate_json_file(json_file)
        if not valid:
            print(f"  {Colors.RED}✗ Invalid JSON: {error}{Colors.NC}")
            failed += 1
            continue
        
        print(f"  {Colors.GREEN}✓ Valid JSON syntax{Colors.NC}")
        
        # Test 2: Has required fields
        missing_fields = validate_test_scenario_schema(data, json_file.name)
        if missing_fields:
            print(f"  {Colors.YELLOW}⚠ Missing fields: {', '.join(missing_fields)}{Colors.NC}")
        else:
            print(f"  {Colors.GREEN}✓ All required fields present{Colors.NC}")
        
        # Test 3: alert_id format
        if 'alert_id' in data:
            alert_id = data['alert_id']
            if isinstance(alert_id, str) and len(alert_id) > 0:
                print(f"  {Colors.GREEN}✓ Valid alert_id: {alert_id}{Colors.NC}")
            else:
                print(f"  {Colors.YELLOW}⚠ Invalid alert_id format{Colors.NC}")
        
        # Test 4: severity is valid
        if 'severity' in data:
            valid_severities = ['low', 'medium', 'high', 'critical']
            if data['severity'] in valid_severities:
                print(f"  {Colors.GREEN}✓ Valid severity: {data['severity']}{Colors.NC}")
            else:
                print(f"  {Colors.YELLOW}⚠ Unknown severity: {data['severity']}{Colors.NC}")
        
        passed += 1
        print()
    
    print(f"{'='*70}")
    print(f"Results: {Colors.GREEN}{passed} passed{Colors.NC}, {Colors.RED}{failed} failed{Colors.NC}")
    print(f"{'='*70}")
    
    return 0 if failed == 0 else 1

if __name__ == '__main__':
    sys.exit(main())