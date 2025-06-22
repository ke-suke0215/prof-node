.PHONY: gh-auth claude-setup help

# GitHub CLI authentication using environment variable
gh-auth:
	@if [ -z "$$GITHUB_TOKEN_FOR_GH_CLI" ]; then \
		echo "Error: GITHUB_TOKEN_FOR_GH_CLI environment variable is not set"; \
		exit 1; \
	fi
	@if gh auth status >/dev/null 2>&1; then \
		echo "GitHub CLI is already authenticated"; \
	else \
		echo "$$GITHUB_TOKEN_FOR_GH_CLI" | gh auth login --with-token && echo "GitHub CLI authentication completed successfully"; \
	fi

# Setup Claude development environment (gh auth + claude cli)
claude-setup: gh-auth
	@echo "Starting Claude CLI with --dangerously-skip-permissions..."
	claude --dangerously-skip-permissions

# Show available commands
help:
	@echo "Available commands:"
	@echo "  gh-auth       Authenticate GitHub CLI using GITHUB_TOKEN_FOR_GH_CLI environment variable"
	@echo "  claude-setup  Setup Claude development environment (gh auth + claude cli)"
	@echo "  help          Show this help message"
