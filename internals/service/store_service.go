package service

import (
	"github.com/fady/gin-demo/internals/models"
	"github.com/fady/gin-demo/internals/repository"
)

type StoreService struct {
    repo *repository.StoreRepository
}

func NewStoreService(repo *repository.StoreRepository) *StoreService {
    return &StoreService{repo: repo}
}

func (s *StoreService) GetStores(areaID, page, pageSize int) ([]models.Store, int, error) {
    return s.repo.GetStores(areaID, page, pageSize)
}

func (s *StoreService) CreateStore(store *models.Store) error {
    return s.repo.CreateStore(store)
}