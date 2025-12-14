#!/usr/bin/env python3
"""
Comprehensive Test Suite for DataIncidentManager Documentation Files
Tests YAML, Markdown, Templates, and Configuration files

This test suite validates all changed files in the git diff against main branch.
"""

import json
import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Tuple, Set

class Colors:
    """ANSI color codes for terminal output"""
    GREEN = '\033[0;32m'
    RED = '\033[0;31m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    CYAN = '\033[0;36m'
    MAGENTA = '\033[0;35m'
    NC = '\033[0m'

class TestResults:
    """Track and report test results"""
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.warnings = 0
        self.tests = []
    
    def add_pass(self, test_name: str, message: str = ""):
        self.passed += 1
        self.tests.append(('PASS', test_name, message))
        print(f"{Colors.GREEN}✓ PASS{Colors.NC}: {test_name}")
        if message:
            print(f"  {message}")
    
    def add_fail(self, test_name: str, message: str):
        self.failed += 1
        self.tests.append(('FAIL', test_name, message))
        print(f"{Colors.RED}✗ FAIL{Colors.NC}: {test_name}")
        print(f"  {Colors.RED}{message}{Colors.NC}")
    
    def add_warning(self, test_name: str, message: str):
        self.warnings += 1
        self.tests.append(('WARN', test_name, message))
        print(f"{Colors.YELLOW}⚠ WARN{Colors.NC}: {test_name}")
        print(f"  {Colors.YELLOW}{message}{Colors.NC}")
    
    def summary(self):
        total = self.passed + self.failed
        print(f"\n{Colors.CYAN}{'='*80}{Colors.NC}")
        print(f"{Colors.CYAN}TEST SUMMARY{Colors.NC}")
        print(f"{Colors.CYAN}{'='*80}{Colors.NC}")
        print(f"Total Tests: {total}")
        print(f"{Colors.GREEN}Passed: {self.passed}{Colors.NC}")
        print(f"{Colors.RED}Failed: {self.failed}{Colors.NC}")
        print(f"{Colors.YELLOW}Warnings: {self.warnings}{Colors.NC}")
        
        if self.failed > 0:
            print(f"\n{Colors.RED}❌ TESTS FAILED{Colors.NC}")
            print("\nFailed tests:")
            for status, name, msg in self.tests:
                if status == 'FAIL':
                    print(f"  • {name}: {msg}")
        else:
            print(f"\n{Colors.GREEN}✅ ALL TESTS PASSED{Colors.NC}")
        
        print(f"{Colors.CYAN}{'='*80}{Colors.NC}\n")
        return 0 if self.failed == 0 else 1


def test_coderabbit_yaml(results: TestResults):
    """Test .coderabbit.yaml configuration file comprehensively"""
    print(f"\n{Colors.BLUE}{'='*80}{Colors.NC}")
    print(f"{Colors.BLUE}Testing .coderabbit.yaml Configuration{Colors.NC}")
    print(f"{Colors.BLUE}{'='*80}{Colors.NC}")
    
    file_path = Path('.coderabbit.yaml')
    
    # Test 1: File exists
    if not file_path.exists():
        results.add_fail("coderabbit_yaml_exists", "File .coderabbit.yaml not found")
        return
    results.add_pass("coderabbit_yaml_exists", "Configuration file exists")
    
    content = file_path.read_text()
    
    # Test 2: Valid YAML syntax
    try:
        import yaml
        data = yaml.safe_load(content)
        results.add_pass("coderabbit_yaml_syntax", "Valid YAML syntax")
    except ImportError:
        # Basic structure validation without yaml module
        if ':' in content and 'language:' in content:
            results.add_pass("coderabbit_yaml_syntax", "Basic YAML structure valid")
            data = None
        else:
            results.add_fail("coderabbit_yaml_syntax", "Invalid YAML structure")
            return
    except Exception as e:
        results.add_fail("coderabbit_yaml_syntax", f"YAML parse error: {str(e)}")
        return
    
    # Test 3: Required top-level fields
    required_fields = {
        'language': 'Language setting',
        'early_access': 'Early access flag',
        'reviews': 'Review configuration',
        'chat': 'Chat settings',
        'knowledge_base': 'Knowledge base configuration'
    }
    
    for field, description in required_fields.items():
        if data and field in data:
            results.add_pass(f"coderabbit_has_{field}", f"{description} present")
        elif f'{field}:' in content:
            results.add_pass(f"coderabbit_has_{field}", f"{description} present")
        else:
            results.add_fail(f"coderabbit_has_{field}", f"Missing {description}")
    
    # Test 4: Language is set correctly
    if data and data.get('language') == 'en-US':
        results.add_pass("coderabbit_language_value", "Language set to en-US")
    elif 'language: "en-US"' in content:
        results.add_pass("coderabbit_language_value", "Language set to en-US")
    
    # Test 5: Review profile configured
    if 'profile:' in content:
        if 'assertive' in content:
            results.add_pass("coderabbit_review_profile", "Review profile set to 'assertive'")
        elif 'chill' in content:
            results.add_pass("coderabbit_review_profile", "Review profile set to 'chill'")
    
    # Test 6: Auto-review enabled
    if 'auto_review:' in content and 'enabled: true' in content:
        results.add_pass("coderabbit_auto_review", "Auto-review enabled")
    else:
        results.add_warning("coderabbit_auto_review", "Auto-review not explicitly enabled")
    
    # Test 7: Review tools configuration
    tools = {
        'shellcheck': 'Shell script linting',
        'yamllint': 'YAML linting',
        'markdownlint': 'Markdown linting',
        'ruff': 'Python linting',
        'actionlint': 'GitHub Actions linting'
    }
    
    for tool, description in tools.items():
        if tool in content:
            if f'{tool}:' in content and 'enabled: true' in content:
                results.add_pass(f"coderabbit_tool_{tool}", f"{description} enabled")
            else:
                results.add_pass(f"coderabbit_tool_{tool}_present", f"{description} configured")
    
    # Test 8: Path filters configured
    if 'path_filters:' in content:
        results.add_pass("coderabbit_path_filters", "Path filters configured")
        
        # Check for exclusion of test files
        if '!test_scenarios/' in content:
            results.add_pass("coderabbit_excludes_tests", "Test scenarios excluded from review")
    
    # Test 9: Path instructions for flows
    if 'flows/**/*.yaml' in content:
        results.add_pass("coderabbit_flow_instructions", "Kestra flow-specific instructions defined")
        
        # Check for Kestra-specific guidance
        kestra_checks = [
            'secret(', 'outputFiles', 'webhook', 'io.kestra.plugin'
        ]
        for check in kestra_checks:
            if check in content:
                results.add_pass(f"coderabbit_kestra_{check.replace('.', '_').replace('(', '')}", 
                               f"Mentions {check}")
    else:
        results.add_warning("coderabbit_flow_instructions", "No Kestra flow-specific instructions")
    
    # Test 10: Shell script best practices documented
    if '**/*.sh' in content:
        results.add_pass("coderabbit_shell_path", "Shell script instructions configured")
        
        if 'set -euo pipefail' in content:
            results.add_pass("coderabbit_shell_best_practices", 
                           "Documents shell script best practices (pipefail)")
    
    # Test 11: Python script guidance
    if 'Python' in content or 'python' in content.lower():
        results.add_pass("coderabbit_python_guidance", "Python-specific guidance present")
    
    # Test 12: Docker best practices
    if 'docker-compose.yml' in content:
        results.add_pass("coderabbit_docker_instructions", "Docker-specific instructions present")
    
    # Test 13: GitHub Actions guidance
    if '.github/workflows' in content:
        results.add_pass("coderabbit_actions_instructions", "GitHub Actions instructions present")
    
    # Test 14: AI Agent specific instructions
    if 'flows/agents' in content:
        results.add_pass("coderabbit_ai_agent_instructions", "AI Agent-specific review guidance")
        
        ai_concerns = ['prompt', 'JSON schema', 'token', 'rate limit']
        for concern in ai_concerns:
            if concern in content:
                results.add_pass(f"coderabbit_ai_{concern.replace(' ', '_')}", 
                               f"Addresses {concern} in AI reviews")
    
    # Test 15: File size reasonable
    file_size = len(content)
    if file_size > 500:
        results.add_pass("coderabbit_comprehensive", 
                       f"Comprehensive configuration ({file_size} bytes)")
    else:
        results.add_warning("coderabbit_size", "Configuration seems minimal")


def test_markdown_files(results: TestResults):
    """Test all markdown documentation files comprehensively"""
    print(f"\n{Colors.BLUE}{'='*80}{Colors.NC}")
    print(f"{Colors.BLUE}Testing Markdown Documentation Files{Colors.NC}")
    print(f"{Colors.BLUE}{'='*80}{Colors.NC}")
    
    md_files = [
        ('README.md', 'Project Documentation'),
        ('CONTRIBUTING.md', 'Contribution Guidelines'),
        ('SECURITY.md', 'Security Policy'),
        ('.github/ISSUE_TEMPLATE/bug_report.md', 'Bug Report Template'),
        ('.github/ISSUE_TEMPLATE/feature_request.md', 'Feature Request Template'),
        ('.github/PULL_REQUEST_TEMPLATE.md', 'Pull Request Template')
    ]
    
    for md_file, description in md_files:
        print(f"\n{Colors.CYAN}Testing {description} ({md_file}){Colors.NC}")
        test_single_markdown_file(md_file, description, results)


def test_single_markdown_file(filepath: str, description: str, results: TestResults):
    """Test a single markdown file comprehensively"""
    file_path = Path(filepath)
    test_prefix = filepath.replace('/', '_').replace('.', '_')
    
    # Test 1: File exists
    if not file_path.exists():
        results.add_fail(f"{test_prefix}_exists", f"{description} not found")
        return
    results.add_pass(f"{test_prefix}_exists", f"{description} exists")
    
    content = file_path.read_text()
    
    # Test 2: File has substantive content
    min_length = 500 if 'TEMPLATE' not in filepath else 200
    if len(content.strip()) < min_length:
        results.add_fail(f"{test_prefix}_length", 
                        f"Content too short (< {min_length} chars)")
        return
    results.add_pass(f"{test_prefix}_length", 
                    f"Sufficient content ({len(content)} chars)")
    
    # Test 3: Has markdown headings
    headings = re.findall(r'^#{1,6}\s+.+$', content, re.MULTILINE)
    if not headings:
        results.add_fail(f"{test_prefix}_headings", "No headings found")
    else:
        results.add_pass(f"{test_prefix}_headings", 
                        f"Contains {len(headings)} headings")
    
    # Test 4: Proper heading hierarchy
    if headings:
        heading_levels = [len(re.match(r'^#+', h).group()) for h in headings]
        
        # Check no gaps in hierarchy
        hierarchy_valid = True
        for i in range(1, len(heading_levels)):
            if heading_levels[i] - heading_levels[i-1] > 1:
                hierarchy_valid = False
                break
        
        if hierarchy_valid:
            results.add_pass(f"{test_prefix}_hierarchy", "Heading hierarchy valid")
        else:
            results.add_warning(f"{test_prefix}_hierarchy", 
                              "Heading hierarchy has gaps (e.g., H1 → H3)")
    
    # Test 5: Check for code blocks
    code_blocks = re.findall(r'```[\w]*\n[\s\S]*?```', content)
    if code_blocks:
        results.add_pass(f"{test_prefix}_code_blocks", 
                        f"Contains {len(code_blocks)} code blocks")
        
        # Check code blocks have language tags
        tagged_blocks = [b for b in code_blocks if re.match(r'```\w+', b)]
        if len(tagged_blocks) == len(code_blocks):
            results.add_pass(f"{test_prefix}_code_languages", 
                           "All code blocks have language tags")
        elif len(tagged_blocks) > 0:
            results.add_warning(f"{test_prefix}_code_languages", 
                              f"Only {len(tagged_blocks)}/{len(code_blocks)} blocks have language tags")
    
    # Test 6: Check markdown links
    markdown_links = re.findall(r'\[([^\]]+)\]\(([^\)]+)\)', content)
    if markdown_links:
        results.add_pass(f"{test_prefix}_has_links", 
                        f"Contains {len(markdown_links)} links")
        
        # Check for broken relative file links
        broken_links = []
        for link_text, link_url in markdown_links:
            if not link_url.startswith(('http://', 'https://', '#', 'mailto:')):
                # Relative file link
                link_file = link_url.split('#')[0]
                if link_file and not Path(link_file).exists():
                    broken_links.append(link_url)
        
        if broken_links:
            results.add_warning(f"{test_prefix}_broken_links", 
                              f"Potentially broken: {', '.join(broken_links[:3])}")
        else:
            results.add_pass(f"{test_prefix}_links_valid", "No obvious broken links")
    
    # Test 7: No trailing whitespace (best practice)
    lines_with_trailing = [i+1 for i, line in enumerate(content.split('\n')) 
                          if line.rstrip() != line and line.strip()]
    if not lines_with_trailing:
        results.add_pass(f"{test_prefix}_no_trailing_whitespace", 
                        "No trailing whitespace")
    elif len(lines_with_trailing) < 5:
        results.add_warning(f"{test_prefix}_trailing_whitespace", 
                          f"Trailing whitespace on {len(lines_with_trailing)} lines")
    
    # Test 8: File ends with newline
    if content.endswith('\n'):
        results.add_pass(f"{test_prefix}_ends_newline", "Ends with newline")
    
    # File-specific tests
    test_file_specific_content(filepath, content, test_prefix, results)


def test_file_specific_content(filepath: str, content: str, prefix: str, results: TestResults):
    """Test file-specific requirements"""
    
    if filepath == 'README.md':
        test_readme_specific(content, prefix, results)
    elif filepath == 'CONTRIBUTING.md':
        test_contributing_specific(content, prefix, results)
    elif filepath == 'SECURITY.md':
        test_security_specific(content, prefix, results)
    elif 'bug_report.md' in filepath:
        test_bug_template_specific(content, prefix, results)
    elif 'feature_request.md' in filepath:
        test_feature_template_specific(content, prefix, results)
    elif 'PULL_REQUEST_TEMPLATE.md' in filepath:
        test_pr_template_specific(content, prefix, results)


def test_readme_specific(content: str, prefix: str, results: TestResults):
    """Test README.md specific requirements"""
    essential_sections = {
        'Table of Contents': r'table\s+of\s+contents',
        'Installation': r'installation',
        'Usage': r'usage',
        'Features': r'features?',
        'Contributing': r'contribut',
        'License': r'license'
    }
    
    for section, pattern in essential_sections.items():
        if re.search(pattern, content, re.IGNORECASE):
            results.add_pass(f"{prefix}_has_{section.replace(' ', '_').lower()}", 
                           f"Has {section} section")
        else:
            results.add_warning(f"{prefix}_missing_{section.replace(' ', '_').lower()}", 
                              f"Missing {section} section")
    
    # Check for badges
    if '![' in content or 'shields.io' in content or 'badge' in content.lower():
        results.add_pass(f"{prefix}_has_badges", "Contains status badges")
    
    # Check for project description
    if len(content.split('\n')[0]) > 10:
        results.add_pass(f"{prefix}_has_description", "Has project description")
    
    # Check for contact/support section
    if 'contact' in content.lower() or 'support' in content.lower():
        results.add_pass(f"{prefix}_has_contact", "Has contact/support information")


def test_contributing_specific(content: str, prefix: str, results: TestResults):
    """Test CONTRIBUTING.md specific requirements"""
    required_sections = {
        'Code of Conduct': r'code\s+of\s+conduct',
        'How to Contribute': r'how.*contribute',
        'Development Setup': r'development\s+setup|local\s+setup',
        'Pull Request Process': r'pull\s+request|pr\s+process',
        'Testing': r'test',
        'Coding Standards': r'coding\s+standard|style\s+guide'
    }
    
    for section, pattern in required_sections.items():
        if re.search(pattern, content, re.IGNORECASE):
            results.add_pass(f"{prefix}_{section.replace(' ', '_').lower()}", 
                           f"Has {section} section")
        else:
            results.add_fail(f"{prefix}_missing_{section.replace(' ', '_').lower()}", 
                           f"Missing {section} section")
    
    # Check for examples
    code_examples = re.findall(r'```', content)
    if len(code_examples) >= 4:  # At least 2 code blocks
        results.add_pass(f"{prefix}_has_examples", 
                        f"Contains {len(code_examples)//2} code examples")
    
    # Check for commit message guidelines
    if 'commit' in content.lower() and 'message' in content.lower():
        results.add_pass(f"{prefix}_commit_guidelines", "Has commit message guidelines")


def test_security_specific(content: str, prefix: str, results: TestResults):
    """Test SECURITY.md specific requirements"""
    required_sections = {
        'Supported Versions': r'supported\s+versions?',
        'Reporting': r'report',
        'Vulnerability': r'vulnerability',
        'Security Policy': r'security\s+policy|security\s+best',
        'Contact': r'contact|email'
    }
    
    for section, pattern in required_sections.items():
        if re.search(pattern, content, re.IGNORECASE):
            results.add_pass(f"{prefix}_{section.replace(' ', '_').lower()}", 
                           f"Has {section} information")
        else:
            results.add_fail(f"{prefix}_missing_{section.replace(' ', '_').lower()}", 
                           f"Missing {section} information")
    
    # Check for version table
    if '|' in content and ('Version' in content or 'version' in content):
        results.add_pass(f"{prefix}_version_table", "Contains version support table")
    
    # Check for security best practices
    if 'best practice' in content.lower() or '✅ DO' in content:
        results.add_pass(f"{prefix}_best_practices", "Documents security best practices")


def test_bug_template_specific(content: str, prefix: str, results: TestResults):
    """Test bug report template specific requirements"""
    required_fields = {
        'Bug Description': r'bug\s+description|describe.*bug',
        'To Reproduce': r'to\s+reproduce|steps\s+to\s+reproduce',
        'Expected Behavior': r'expected\s+behavio?r',
        'Actual Behavior': r'actual\s+behavio?r',
        'Environment': r'environment',
        'Screenshots': r'screenshot|logs?'
    }
    
    for field, pattern in required_fields.items():
        if re.search(pattern, content, re.IGNORECASE):
            results.add_pass(f"{prefix}_{field.replace(' ', '_').lower()}", 
                           f"Has {field} field")
        else:
            results.add_fail(f"{prefix}_missing_{field.replace(' ', '_').lower()}", 
                           f"Missing {field} field")
    
    # Check for checklist
    if '- [ ]' in content:
        results.add_pass(f"{prefix}_has_checklist", "Contains submission checklist")


def test_feature_template_specific(content: str, prefix: str, results: TestResults):
    """Test feature request template specific requirements"""
    required_fields = {
        'Feature Description': r'feature\s+description|describe.*feature',
        'Problem': r'problem|motivation',
        'Proposed Solution': r'proposed\s+solution|solution',
        'Use Case': r'use\s+case|user\s+story',
        'Alternatives': r'alternative'
    }
    
    for field, pattern in required_fields.items():
        if re.search(pattern, content, re.IGNORECASE):
            results.add_pass(f"{prefix}_{field.replace(' ', '_').lower()}", 
                           f"Has {field} field")
        else:
            results.add_fail(f"{prefix}_missing_{field.replace(' ', '_').lower()}", 
                           f"Missing {field} field")
    
    # Check for acceptance criteria
    if 'acceptance' in content.lower() and 'criteria' in content.lower():
        results.add_pass(f"{prefix}_acceptance_criteria", "Includes acceptance criteria")


def test_pr_template_specific(content: str, prefix: str, results: TestResults):
    """Test pull request template specific requirements"""
    required_sections = {
        'Description': r'description',
        'Related Issue': r'related\s+issue|closes\s+#|fixes\s+#',
        'Type of Change': r'type\s+of\s+change',
        'Testing': r'test',
        'Checklist': r'checklist'
    }
    
    for section, pattern in required_sections.items():
        if re.search(pattern, content, re.IGNORECASE):
            results.add_pass(f"{prefix}_{section.replace(' ', '_').lower()}", 
                           f"Has {section} section")
        else:
            results.add_fail(f"{prefix}_missing_{section.replace(' ', '_').lower()}", 
                           f"Missing {section} section")
    
    # Check for change type options
    change_types = ['bug fix', 'feature', 'breaking change', 'documentation']
    found_types = [ct for ct in change_types if ct.lower() in content.lower()]
    if len(found_types) >= 3:
        results.add_pass(f"{prefix}_change_types", 
                        f"Lists {len(found_types)} change types")
    
    # Check for testing section
    if 'test' in content.lower() and ('- [ ]' in content or '```' in content):
        results.add_pass(f"{prefix}_testing_details", "Has detailed testing section")


def test_gitignore(results: TestResults):
    """Test .gitignore file comprehensively"""
    print(f"\n{Colors.BLUE}{'='*80}{Colors.NC}")
    print(f"{Colors.BLUE}Testing .gitignore Configuration{Colors.NC}")
    print(f"{Colors.BLUE}{'='*80}{Colors.NC}")
    
    file_path = Path('.gitignore')
    
    if not file_path.exists():
        results.add_fail("gitignore_exists", ".gitignore not found")
        return
    results.add_pass("gitignore_exists", "File exists")
    
    content = file_path.read_text()
    
    # Test common patterns
    common_patterns = {
        '.env': 'Environment variables',
        'node_modules': 'Node.js dependencies',
        '__pycache__': 'Python cache',
        '.DS_Store': 'macOS system files',
        '*.pyc': 'Python compiled files',
        '.vscode': 'VS Code settings',
        '.idea': 'IntelliJ settings'
    }
    
    for pattern, description in common_patterns.items():
        if pattern in content:
            results.add_pass(f"gitignore_has_{pattern.replace('.', '_').replace('*', 'wildcard')}", 
                           f"Ignores {description}")
    
    # Test formatting
    if content.endswith('\n') and not content.endswith('\n\n'):
        results.add_pass("gitignore_formatting", "Proper formatting")
    
    # Test has comments
    comment_lines = [line for line in content.split('\n') if line.strip().startswith('#')]
    if comment_lines:
        results.add_pass("gitignore_documented", 
                        f"Contains {len(comment_lines)} comment lines")
    
    # Test for project-specific ignores
    project_patterns = ['CODERABBIT_', '_encoded', 'PROFESSIONAL_']
    found_project = [p for p in project_patterns if p in content]
    if found_project:
        results.add_pass("gitignore_project_specific", 
                        "Has project-specific ignore patterns")


def test_image_file(results: TestResults):
    """Test image file integrity"""
    print(f"\n{Colors.BLUE}{'='*80}{Colors.NC}")
    print(f"{Colors.BLUE}Testing Image File{Colors.NC}")
    print(f"{Colors.BLUE}{'='*80}{Colors.NC}")
    
    img_path = Path('public/DataIncidentManager.png')
    
    if not img_path.exists():
        results.add_fail("image_exists", "Banner image not found")
        return
    results.add_pass("image_exists", "Banner image exists")
    
    # Test file size
    file_size = img_path.stat().st_size
    if file_size == 0:
        results.add_fail("image_not_empty", "Image file is empty")
        return
    results.add_pass("image_not_empty", f"Image size: {file_size:,} bytes")
    
    if file_size > 10 * 1024 * 1024:  # 10MB
        results.add_warning("image_size", 
                          f"Image is large ({file_size / 1024 / 1024:.1f}MB)")
    elif file_size > 500 * 1024:  # 500KB
        results.add_pass("image_size_reasonable", 
                        f"Size is reasonable ({file_size / 1024:.1f}KB)")
    else:
        results.add_pass("image_size_optimal", 
                        f"Size is optimal ({file_size / 1024:.1f}KB)")
    
    # Test PNG signature
    with open(img_path, 'rb') as f:
        header = f.read(8)
        png_signature = b'\x89PNG\r\n\x1a\n'
        if header == png_signature:
            results.add_pass("image_valid_png", "Valid PNG file signature")
        else:
            results.add_fail("image_invalid", "Invalid PNG file signature")
    
    # Test image is referenced in README
    readme = Path('README.md')
    if readme.exists():
        readme_content = readme.read_text()
        if 'DataIncidentManager.png' in readme_content:
            results.add_pass("image_referenced", "Image referenced in README")
        else:
            results.add_warning("image_not_referenced", "Image not referenced in README")


def test_github_structure(results: TestResults):
    """Test GitHub templates directory structure"""
    print(f"\n{Colors.BLUE}{'='*80}{Colors.NC}")
    print(f"{Colors.BLUE}Testing GitHub Templates Structure{Colors.NC}")
    print(f"{Colors.BLUE}{'='*80}{Colors.NC}")
    
    # Test .github directory
    github_dir = Path('.github')
    if not github_dir.exists():
        results.add_fail("github_dir", ".github directory not found")
        return
    results.add_pass("github_dir", ".github directory exists")
    
    # Test ISSUE_TEMPLATE directory
    issue_dir = Path('.github/ISSUE_TEMPLATE')
    if not issue_dir.exists():
        results.add_fail("issue_template_dir", "ISSUE_TEMPLATE directory not found")
    else:
        results.add_pass("issue_template_dir", "ISSUE_TEMPLATE directory exists")
    
    # Test required templates
    required_templates = {
        '.github/ISSUE_TEMPLATE/bug_report.md': 'Bug report template',
        '.github/ISSUE_TEMPLATE/feature_request.md': 'Feature request template',
        '.github/PULL_REQUEST_TEMPLATE.md': 'Pull request template'
    }
    
    for template_path, description in required_templates.items():
        if Path(template_path).exists():
            results.add_pass(f"template_{Path(template_path).stem}", 
                           f"{description} exists")
        else:
            results.add_fail(f"template_{Path(template_path).stem}", 
                           f"{description} missing")


def test_documentation_cross_references(results: TestResults):
    """Test cross-references between documentation files"""
    print(f"\n{Colors.BLUE}{'='*80}{Colors.NC}")
    print(f"{Colors.BLUE}Testing Documentation Cross-References{Colors.NC}")
    print(f"{Colors.BLUE}{'='*80}{Colors.NC}")
    
    # Read key files
    files = {}
    for name in ['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'CODE_OF_CONDUCT.md']:
        path = Path(name)
        if path.exists():
            files[name] = path.read_text()
    
    if 'README.md' not in files:
        results.add_fail("cross_ref_no_readme", "README.md not found")
        return
    
    readme = files['README.md']
    
    # Test README references
    references = {
        'CONTRIBUTING': ('CONTRIBUTING.md', 'Contributing guidelines'),
        'SECURITY': ('SECURITY.md', 'Security policy'),
        'CODE_OF_CONDUCT': ('CODE_OF_CONDUCT.md', 'Code of Conduct')
    }
    
    for ref_text, (filename, description) in references.items():
        if ref_text in readme or filename in readme:
            results.add_pass(f"readme_refs_{ref_text.lower()}", 
                           f"README references {description}")
        else:
            results.add_warning(f"readme_missing_ref_{ref_text.lower()}", 
                              f"README doesn't reference {description}")
    
    # Test CONTRIBUTING references back
    if 'CONTRIBUTING.md' in files:
        contributing = files['CONTRIBUTING.md']
        if 'README' in contributing:
            results.add_pass("contributing_refs_readme", 
                           "CONTRIBUTING references README")
        
        if 'CODE_OF_CONDUCT' in contributing or 'Code of Conduct' in contributing:
            results.add_pass("contributing_refs_coc", 
                           "CONTRIBUTING references Code of Conduct")


def main():
    """Run all test suites"""
    print(f"{Colors.MAGENTA}{'='*80}{Colors.NC}")
    print(f"{Colors.MAGENTA}DataIncidentManager - Comprehensive Documentation Test Suite{Colors.NC}")
    print(f"{Colors.MAGENTA}Testing files changed in git diff main..HEAD{Colors.NC}")
    print(f"{Colors.MAGENTA}{'='*80}{Colors.NC}")
    
    results = TestResults()
    
    # Run all test suites
    test_coderabbit_yaml(results)
    test_markdown_files(results)
    test_gitignore(results)
    test_image_file(results)
    test_github_structure(results)
    test_documentation_cross_references(results)
    
    # Print final summary
    return results.summary()


if __name__ == '__main__':
    sys.exit(main())