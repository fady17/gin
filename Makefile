# Go application Makefile

# Go parameters
GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get

# Binary name
BINARY_NAME=store-app
BINARY_UNIX=$(BINARY_NAME)_unix

# Frontend parameters
FRONTEND_DIR=frontend
FRONTEND_CMD=bun

.PHONY: all test clean run build-frontend build-backend build docker build docker run docker compose-up

all: build-backend build-frontend

build-backend:
	cd backend && $(GOBUILD) -o $(BINARY_NAME) -v ./cmd/main.go

test-backend:
	cd backend && $(GOTEST) -v ./...

clean-backend:
	cd backend && $(GOCLEAN)
	rm -f $(BINARY_NAME)
	rm -f $(BINARY_UNIX)

build-frontend:
	cd $(FRONTEND_DIR) && $(FRONTEND_CMD) install
	cd $(FRONTEND_DIR) && $(FRONTEND_CMD) run build

clean-frontend:
	cd $(FRONTEND_DIR) && rm -rf dist node_modules

run-backend:
	cd backend && $(GOBUILD) -o $(BINARY_NAME) -v ./cmd/main.go
	./$(BINARY_NAME)

run-frontend:
	cd $(FRONTEND_DIR) && $(FRONTEND_CMD) dev

docker-build: build-frontend build-backend
	docker compose build

docker-run:
	docker compose up

docker-down:
	docker compose down

docker-clean: docker-down
	docker compose rm -f
	docker volume prune -f
