import { useEffect, useState } from "react";
import { OrderService } from "../../../services/orderservice/OrderService";
import { HiArrowRight } from "react-icons/hi";
import Paginator from "../../product/paginator";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderList = () => {
  const [orderPage, setOrderPage] = useState();
  const [orders, setOrders] = useState([]);
  const service = new OrderService();
  const [orderItemsCount, setOrderItemsCount] = useState(1);
  const [totalElement, setTotalElement] = useState(0);
  const pageSize = 7;
  const [currentPage, setCurrentPage] = useState(0);
  const navigator = useNavigate();

  useEffect(() => {
    getItems(currentPage);
  }, [currentPage]);

  const getItems = (page) => {
    service
      .getUserOrders({
        page: page,
        size: pageSize,
      })
      .then((response) => {
        if (response.statusCode === 200) {
          setOrderPage(response.data.items);
          setTotalElement(response.data.items.totalElements);
        }else {
          toast.error(response.description, {
            position: "top-left",
            autoClose: 3000,
          });
        }
      });
  };

  useEffect(()=> {
    if(orderPage){
      setOrders(orderPage.content);
    }
  },[orderPage])

  useEffect(()=> {
    if(orders){
      setOrderItemsCount(orders.length)
    }
  },[orders])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const routeSummary = (code) => {
    navigator(`${code}`)
  }

  const getColorByStatus = (status) => {
    switch (status) {
      case "SIPARIS_ALINDI":
        return "yellow";
      case "HAZIRLANIYOR":
        return "blue";
      case "KARGOYA_VERILDI":
        return "green";
      case "TESLIM_EDILDI":
        return "red";
      default:
        throw console.error("UNKNOWN VALUE");
    }
  };

  return (
    <div className="w-full">
      <div className="border rounded-lg border pb-6 border-gray-200">
        <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
          <p className="text-sm lg:text-xl font-semibold leading-tight text-gray-800">
            Siparişlerim
          </p>
        </div>
        <div className="px-6 pt-6 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="flex items-center">
                      <div className="rounded-sm p-2.5">
                        <img
                          className="rounded-sm max-w-16 max-h-16"
                          src="https://cdn-icons-png.flaticon.com/512/3500/3500833.png"
                          alt=""
                        />
                      </div>
                      <div className="pl-3">
                        <div className="flex items-center text-sm leading-none">
                          <p className="font-semibold text-gray-800">
                            Sipariş Tarihi : {order.shipmentDate}
                          </p>
                          <p className="text-blue-500 ml-3">({order.code})</p>
                        </div>
                        <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">
                          {orderItemsCount} Ürün
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="pl-16">
                    <div className="flex justify-between items-center">
                      {/* Sipariş Tutarı */}
                      <div>
                        <p className="text-sm font-semibold leading-none text-right text-gray-800">
                          TRY {order.amount.toLocaleString("tr-TR")}
                        </p>
                        <div
                          className={`flex items-center justify-center px-2 py-1 mt-2 bg-${getColorByStatus(
                            order.status
                          )}-100 rounded-full`}
                        >
                          <p
                            className={`text-xs leading-3 text-${getColorByStatus(
                              order.status
                            )}-700`}
                          >
                            {order.status}
                          </p>
                        </div>
                      </div>

                      {/* Yönlendirme Butonu */}
                      <button
                        className="ml-4 p-2 rounded-full bg-blue-500 hover:bg-blue-700 transition duration-200"
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={()=> {routeSummary(order.code)}}
                      >
                        <HiArrowRight className="text-white text-2xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-10">
            {/* PAGINATOR GELCEK BURAYA */}
            <Paginator
              currentPage={currentPage}
              totalItems={totalElement}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;