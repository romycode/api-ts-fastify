PROJECT_NAME="fastify-api"
PROJECT_DIR="/opt/api"

LIVE_CONTAINER="$(PROJECT_NAME)_live"
TEST_CONTAINER="$(PROJECT_NAME)_testing"

PNPM_STORE_LOCAL=$(shell pnpm store path)
PNPM_STORE_CONTAINER="/opt/.pnpm-store/v3"

build:
	@ docker build -t $(PROJECT_NAME) .

up:
	@ docker run -itd -w $(PROJECT_DIR) -v "$(PNPM_STORE_LOCAL):$(PNPM_STORE_CONTAINER)" -v "$(PWD):$(PROJECT_DIR)" -v "$(PWD):$(PROJECT_DIR)" -p "8080:8080" --name $(LIVE_CONTAINER) $(PROJECT_NAME) npm run start

down:
	@ docker container kill $(LIVE_CONTAINER) > /dev/null 2>&1
	@ docker container rm $(LIVE_CONTAINER) > /dev/null 2>&1

deps:
	@ docker run -it -w $(PROJECT_DIR) -v "$(PNPM_STORE_LOCAL):$(PNPM_STORE_CONTAINER)" -v "$(PWD):$(PROJECT_DIR)" -p "8080:8080" --rm $(PROJECT_NAME) pnpm i

bash:
	@ docker run -it -w $(PROJECT_DIR) -v "$(PNPM_STORE_LOCAL):$(PNPM_STORE_CONTAINER)" -v "$(PWD):$(PROJECT_DIR)" -p "8080:8080" --rm $(PROJECT_NAME) /bin/bash

.PHONY: tests
tests:
	@ docker run -it -w $(PROJECT_DIR) -v "$(PNPM_STORE_LOCAL):$(PNPM_STORE_CONTAINER)" -v "$(PWD):$(PROJECT_DIR)" --name $(TEST_CONTAINER) $(PROJECT_NAME) npm run tests || true
	@ docker container rm $(TEST_CONTAINER) > /dev/null 2>&1
