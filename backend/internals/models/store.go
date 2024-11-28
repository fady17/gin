package models

type Store struct {
    ID        int    `db:"id" json:"id"`
    Name      string `db:"name" json:"name" binding:"required,min=2,max=100"`
    AreaID    int    `db:"area_id" json:"area_id" binding:"required"`
    AreaName  string `db:"area_name" json:"area_name"`
}