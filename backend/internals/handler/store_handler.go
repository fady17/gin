package handler

import (
	"net/http"
	"strconv"

	"github.com/fady/gin-demo/internals/models"
	"github.com/fady/gin-demo/internals/service"
	"github.com/gin-gonic/gin"
)
   


type StoreHandler struct {
    service *service.StoreService
}

func NewStoreHandler(service *service.StoreService) *StoreHandler {
    return &StoreHandler{service: service}
}

func (h *StoreHandler) GetStores(c *gin.Context) {
    areaID, _ := strconv.Atoi(c.DefaultQuery("area_id", "1"))
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "10"))

    stores, total, err := h.service.GetStores(areaID, page, pageSize)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to retrieve stores",
            "details": err.Error(),
        })
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "stores": stores,
        "total": total,
        "page": page,
        "page_size": pageSize,
    })
}

func (h *StoreHandler) CreateStore(c *gin.Context) {
    var store models.Store
    if err := c.ShouldBindJSON(&store); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid input",
            "details": err.Error(),
        })
        return
    }

    if err := h.service.CreateStore(&store); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to create store",
            "details": err.Error(),
        })
        return
    }

    c.JSON(http.StatusCreated, store)
}