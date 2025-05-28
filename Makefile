include .env

.PHONY: help
help: ## Display available commands
	@echo "Available commands:"
	@grep -E '^[a-zA-Z0-9_-]+:.*## .*$$' Makefile | awk 'BEGIN {FS = ":.*## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

lint: ## Lint with prettier, eslint, and svelte check
	@echo "Running make $@..."
	pnpm run lint
	pnpm run check

format: ## Format with prettier
	@echo "Running make $@..."
	pnpm run format

setup: ## Install dependencies
	@echo "Running make $@..."
	pnpm install

run: setup ## Run the app locally for faster development
	@echo "Running make $@..."
	pnpm run dev -- --open

run-build: setup ## Build the app for production
	@echo "Running make $@..."
	pnpm run build
