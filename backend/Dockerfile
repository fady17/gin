# Start with the official Go image
FROM golang:1.23.3-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code into the container
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o store-app ./cmd/main.go

# Start a new stage from scratch
FROM alpine:latest  

WORKDIR /root/

# Copy the pre-built binary file from the previous stage
COPY --from=builder /app/store-app .

# Command to run the executable
EXPOSE 8080
CMD ["./store-app"]
