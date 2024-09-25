import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderService } from "../../../services/orderservice/OrderService";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const { code } = useParams();
  const [order, setOrder] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const service = new OrderService();
  const defaultImage =
    "https://png.pngtree.com/png-clipart/20191120/original/pngtree-cancel-cart-product-icon-png-image_5060873.jpg";

  useEffect(() => {
    getItem(code);
  }, []);

  const getItem = (code) => {
    service.getByCode(code).then((response) => {
      if (response.statusCode === 200) {
        setOrder(response.data);
      } else {
        toast.error(response.description, {
          position: "top-left",
          autoClose: 3000,
        });
      }
    });
  };

  useEffect(() => {
    if (order) {
      setOrderItems(order.orderItems);
    }
  }, [order]);

  return (
    <div className="2xl:container 2xl:mx-auto py-14 px-4 md:px-6 xl:px-20">
      <div className="flex flex-col xl:flex-row justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8">
        <div className="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full">
          <h3 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 w-full  md:text-left text-gray-800">
            Sipariş Özeti
          </h3>
          {orderItems.map((item) => (
            <div className="flex justify-center items-center w-full mt-8  flex-col space-y-4 ">
              <div className="flex md:flex-row justify-start items-start md:items-center  border border-gray-200 w-full">
                <div className="w-40 md:w-32">
                  <img
                    className="hidden md:block"
                    src={item.product.image ? item.product.image : defaultImage}
                    alt=""
                  />
                  <img
                    className="md:hidden"
                    src={item.product.image ? item.product.image : defaultImage}
                    alt=""
                  />
                </div>
                <div className="flex justify-start md:justify-between items-start md:items-center  flex-col md:flex-row w-full p-4 md:px-8">
                  <div className="flex flex-col md:flex-shrink-0  justify-start items-start">
                    <h3 className="text-lg md:text-xl  w-full font-semibold leading-6 md:leading-5  text-gray-800">
                      {item.product.name}
                    </h3>
                    <div className="flex flex-row justify-start  space-x-4 md:space-x-6 items-start mt-4 ">
                      <p className="text-sm leading-none text-gray-600">
                        Adet:{" "}
                        <span className="text-gray-800"> {item.quantity}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-4 md:mt-0 md:justify-end items-center w-full ">
                    <p className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800">
                      TRY {item.totalAmount.toLocaleString("tr-TR")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full">
            <div className="flex justify-center items-center flex-col md:flex-row w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8 lg:w-full">
              <div className="flex justify-start items-start flex-col space-y-2 flex-1 p-2">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Fatura Adresi
                </p>
                <p className="text-sm leading-5 text-gray-600">
                  {order?.billingAddress}
                </p>
              </div>
              <div className="flex justify-start items-start flex-col space-y-2 flex-1 p-2">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Teslimat Adresi
                </p>
                <p className="text-sm leading-5 text-gray-600">
                  {order?.deliveryAddress}
                </p>
              </div>
              <div className="flex justify-start items-start flex-col space-y-2 flex-1 p-2">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Kargo
                </p>
                <p className="text-sm leading-5 text-gray-600">
                  PTT - 3 iş günü içerisinde teslim
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4 w-full">
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">
                    Alt Toplam
                  </p>
                  <p className="text-base leading-4 text-gray-600">
                    TRY {order?.amount?.toLocaleString("tr-TR")}
                  </p>
                </div>
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Discount</p>
                  <p className="text-base leading-4 text-gray-600">TRY 0.00</p>
                </div>
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Kargo</p>
                  <p className="text-base leading-4 text-gray-600">TRY 0.00</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Toplam
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                  TRY {order?.amount.toLocaleString("tr-TR")}
                </p>
              </div>
              <div className="flex w-full justify-center items-center pt-1 md:pt-4  xl:pt-8 space-y-6 md:space-y-8 flex-col">
                <button className="py-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700  w-full text-base font-medium leading-4 text-white bg-blue-500 hover:bg-blue">
                  Sipariş Takip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
