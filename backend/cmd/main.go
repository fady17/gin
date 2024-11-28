package main

import (
	"github.com/fady/gin-demo/config"
	"github.com/fady/gin-demo/internals/handler"
	"github.com/fady/gin-demo/internals/repository"
	"github.com/fady/gin-demo/internals/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
    db := config.InitDB()
    defer db.Close()

    storeRepo := repository.NewStoreRepository(db)
    storeService := service.NewStoreService(storeRepo)
    storeHandler := handler.NewStoreHandler(storeService)

    r := gin.Default()

	r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"}, // Frontend origin
        AllowMethods:     []string{"GET", "POST", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
    }))


    r.GET("/stores", storeHandler.GetStores)
    r.POST("/stores", storeHandler.CreateStore)

    r.Run(":8080")
}