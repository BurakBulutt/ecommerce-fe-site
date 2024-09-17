import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import { BasketService } from "../../services/basketservice/BasketService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Basket = (props) => {
  const { basket, setBasket } = useContext(BasketContext);
  const service = new BasketService();
  const navigator = useNavigate();
  const defaultImage = "https://png.pngtree.com/png-clipart/20191120/original/pngtree-cancel-cart-product-icon-png-image_5060873.jpg";

  const openCheckout = () => {
    if(basket?.basketProducts.length >= 1) {
      props.openCloseBasket(false);
      navigator(`/checkout`);
    }else {
      toast.info("Sepette Ürün Bulunmamaktadır",{
        position : 'top-left',
        autoClose : 3000
      })
    }

  };

  const deleteBasketProduct = (basketProductId) => {
    service.deleteBasketProduct(basketProductId).then((response) => {
      if (response.statusCode === 200) {
        setBasket(response.data);
        toast.success("Ürün Başarıyla Kaldırıldı", {
          position: "top-left",
          autoClose: 3000,
        });
      } else {
        toast.error(response.description, {
          position: "top-left",
          autoClose: 3000,
        });
        setBasket(undefined);
      }
    });
  };

  return (
    <Dialog
      open={props.visibility}
      onClose={props.openCloseBasket}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Sepet
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => props.openCloseBasket(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Kapat</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {basket?.basketProducts?.map((basketProduct) => (
                          <li key={basketProduct.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-transparent">
                              <img
                                alt=""
                                src={
                                  basketProduct.product?.image
                                    ? basketProduct.product?.image
                                    : defaultImage
                                }
                                className="h-full w-full object-contain bg-transparent"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <p>{basketProduct.product?.name}</p>
                                  </h3>
                                  <p className="ml-4">
                                    {basketProduct.product?.price.toLocaleString(
                                      "tr-TR"
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Adet {basketProduct.quantity}
                                </p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => {
                                      deleteBasketProduct(basketProduct.id);
                                    }}
                                  >
                                    Sil
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Toplam</p>
                    <p>
                      {" "}
                      TRY{" "}
                      {basket?.totalAmount
                        ? basket?.totalAmount.toLocaleString("tr-TR")
                        : "0.00"}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Kargo ve vergiler dahildir.
                  </p>
                  <div className="mt-6">
                    <a
                      onClick={openCheckout}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Sipariş Ekranına Git
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      veya{" "}
                      <button
                        type="button"
                        onClick={() => props.openCloseBasket(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Alışverişe Devam Et
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Basket;