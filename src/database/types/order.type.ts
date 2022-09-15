type Order = {
  id?: number;
  user_id: number;
  status: string;
};

type ProductToOrder = {
  id?: number;
  order_id: number;
  product_id: number;
  qty: number;
};

export default Order;
export { ProductToOrder };
