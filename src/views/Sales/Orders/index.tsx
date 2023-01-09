import OrdersTop from "./OrdersTop/OrdersTop";
import OrdersTable from "./OrdersTable/OrdersTable";

const Orders = () => {
  localStorage.removeItem('orderClickedRowPersonalInfo')
  localStorage.removeItem('orderClickedRowInfo')
  return (
    <div>
      <OrdersTop></OrdersTop>
      <OrdersTable></OrdersTable>
    </div>
  );
};

export default Orders;