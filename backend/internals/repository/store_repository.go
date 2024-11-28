package repository

import (
	"github.com/fady/gin-demo/internals/models"
	"github.com/jmoiron/sqlx"
)

type StoreRepository struct {
    db *sqlx.DB
}

func NewStoreRepository(db *sqlx.DB) *StoreRepository {
    return &StoreRepository{db: db}
}

func (r *StoreRepository) GetStores(areaID, page, pageSize int) ([]models.Store, int, error) {
    offset := (page - 1) * pageSize
    query := `
        SELECT stores.id, stores.name, area.name AS area_name
        FROM stores
        JOIN area ON stores.area_id = area.id
        WHERE stores.area_id = $1
        LIMIT $2 OFFSET $3
    `
    var stores []models.Store
    err := r.db.Select(&stores, query, areaID, pageSize, offset)
    if err != nil {
        return nil, 0, err
    }

    var total int
    countQuery := `SELECT COUNT(*) FROM stores WHERE area_id = $1`
    err = r.db.Get(&total, countQuery, areaID)
    return stores, total, err
}

func (r *StoreRepository) CreateStore(store *models.Store) error {
    query := `
        INSERT INTO stores (name, area_id)
        VALUES ($1, $2)
        RETURNING id
    `
    return r.db.Get(&store.ID, query, store.Name, store.AreaID)
}