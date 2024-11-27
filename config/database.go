package config

import (
	"log"
	"os"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func InitDB() *sqlx.DB {
    _ = godotenv.Load()

    connStr := os.Getenv("DATABASE_URL")
    if connStr == "" {
        log.Fatal("DATABASE_URL not set")
    }

    db, err := sqlx.Connect("postgres", connStr)
    if err != nil {
        log.Fatalf("Database connection failed: %v", err)
    }

    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(25)
    db.SetConnMaxLifetime(5 * time.Minute)

    return db
}