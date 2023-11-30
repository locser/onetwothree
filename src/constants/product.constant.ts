// Bộ enum cho giá trị số của product_type
export enum PRODUCT_TYPE {
  CLOTHING = 1,
  ELECTRONIC = 2,
  DECOR = 3,
  // Thêm các giá trị enum khác nếu cần thiết
}

// Bộ enum cho tên của product_type
export const PRODUCT_TYPE_NAME = {
  1: 'Trang trí để bàn',
  2: 'Trang trí treo tường',
  3: 'Sticker trang trí',
};

export const DECOR_PLACEMENT_NAME = {
  1: 'Trang trí để bàn',
  2: 'Trang trí treo tường',
  3: 'Sticker trang trí',
};

export enum DECOR_PLACEMENT_TYPE {
  TABLE = 1,
  WALL = 2,
  STICK = 3,
}
