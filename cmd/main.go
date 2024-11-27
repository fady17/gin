package main

import (
	"github.com/fady/gin-demo/config"
	"github.com/fady/gin-demo/internals/handler"
	"github.com/fady/gin-demo/internals/repository"
	"github.com/fady/gin-demo/internals/service"
	"github.com/gin-gonic/gin"
)

func main() {
    db := config.InitDB()
    defer db.Close()

    storeRepo := repository.NewStoreRepository(db)
    storeService := service.NewStoreService(storeRepo)
    storeHandler := handler.NewStoreHandler(storeService)

    r := gin.Default()
    r.GET("/stores", storeHandler.GetStores)
    r.POST("/stores", storeHandler.CreateStore)

    r.Run(":8080")
}