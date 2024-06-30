.PHONY: install run build format bundle purge

# Set default env as develop if ENV is not specified.
ENV ?= develop

# Define GIT_REVISION and GIT_TAG or provide default values.
GIT_REVISION ?= default_revision
GIT_TAG ?= default_tag

# Define the YARN command with environment variables.
YARN := REACT_APP_GIT_REVISION=$(GIT_REVISION) REACT_APP_GIT_TAG=$(GIT_TAG) yarn

# Common dependencies for run and build.
COMMON_DEPS := install

# Define the DOCKER command.
DOCKER := docker

# Define the DOCKER image and container name.
IMAGE_NAME := react-employee-management
CONTAINER_NAME := docker-employee-management

# Defined DOCKER target volume (Must be the same with WORKDIR in Dockerfile)
TARGET = "/app"

# Docker commands
build-image:
	@$(DOCKER) build -t $(CONTAINER_NAME) .

run-container:
	@$(DOCKER) run -d -p 3000:3000 --name $(CONTAINER_NAME) --mount type=bind,source="$(CURDIR)",target="$(TARGET)" $(CONTAINER_NAME)

start-container:
	@$(DOCKER) start $(CONTAINER_NAME)

stop-container:
	@$(DOCKER) stop $(CONTAINER_NAME)

# Yarn commands
install:
	@echo "Installing dependencies..."
	@$(YARN) install --frozen-lockfile || (echo "Error: Failed to install dependencies."; exit 1)

run: $(COMMON_DEPS)
	@echo "Starting the application..."
	@$(YARN) dev

build: $(COMMON_DEPS)
	@echo "Building the application..."
	@NODE_OPTIONS="--max-old-space-size=16384" $(YARN) build
	
preview:
	@echo "Preview the application build..."
	@$(YARN) preview

preview-production:
	@echo "Preview the application build for production environment..."
	@$(YARN) preview:production

purge:
	@echo "Removing node_modules..."
	@rm -Rf ./node_modules

format:
	@echo "Formatting code..."
	@$(YARN) format

run-lint:
	@echo "Running lint..."
	@$(YARN) lint

lint-fix:
	@echo "Fixing lint issues..."
	@$(YARN) lint:fix

check-types:
	@echo "Checking types..."
	@$(YARN) check-types

test:
	@echo "Running unit test..."
	@$(YARN) test

test-e2e:
	@echo "Running e2e test..."
	@$(YARN) test:e2e

test-e2e-ui:
	@echo "Running e2e test with UI..."
	@$(YARN) test:e2e:ui

storybook:
	@echo "Running storybook..."
	@$(YARN) storybook
