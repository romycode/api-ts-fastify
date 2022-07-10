PROJECT_NAME="fastify-api"
LIVE_CONTAINER="$(PROJECT_NAME)_live"
TEST_CONTAINER="$(PROJECT_NAME)_testing"

build:
	@ docker build -t $(PROJECT_NAME) .

up:
	@ docker run -itdw "/opt/api" -v "$(PWD):/opt/api" -p "8080:8080" --name $(LIVE_CONTAINER) $(PROJECT_NAME) npm run start

down:
	@ docker container kill $(LIVE_CONTAINER) > /dev/null 2>&1
	@ docker container rm $(LIVE_CONTAINER) > /dev/null 2>&1

bash:
	@ docker run -itw "/opt/api" -v "$(PWD):/opt/api" -v "/home/arm/.pnpm-store:/opt/.pnpm-store" -p "8080:8080" --rm $(PROJECT_NAME) /bin/bash

.PHONY: tests
tests:
	@ docker run -itw "/opt/api" -v "$(PWD):/opt/api" --name $(TEST_CONTAINER) $(PROJECT_NAME) npm run tests || true
	@ docker container rm $(TEST_CONTAINER) > /dev/null 2>&1
