import { useContext, useState } from "react";
import { BasketContext } from "../context/BasketContext";
import { PaymentService } from "../../services/paymentservice/PaymentService";
import { useFormik } from "formik";
import { PaymentRequestSchema } from "../../utilities/ValidationSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BasketService } from "../../services/basketservice/BasketService";

const Checkout = () => {
  const { basket, setBasket } = useContext(BasketContext);
  const [submitted, setSubmitted] = useState(false);
  const service = new PaymentService();
  const basketService = new BasketService();
  const baseRequest = {
    billingAddress: "",
    deliveryAddress: "",
  };
  const defaultImage =
    "https://png.pngtree.com/png-clipart/20191120/original/pngtree-cancel-cart-product-icon-png-image_5060873.jpg";
  const navigator = useNavigate();

  const handleSubmit = () => {
    setSubmitted(true);
    formik.handleSubmit();
  };

  const formik = useFormik({
    initialValues: baseRequest,
    validationSchema: PaymentRequestSchema,
    onSubmit: (data) => {
      service.createPayment(data).then((response) => {
        if (response.statusCode === 200) {
          toast.success("Siparişiniz Alındı Ana Sayfaya Yönlendiriliyorsunuz", {
            position: "top-left",
            autoClose: 3000,
          });
          setSubmitted(false);
          setTimeout(() => {
            navigator("/",{replace : true});
            getBasket();
          }, 4000);
        } else {
          toast.error(response.description, {
            position: "top-left",
            autoClose: 3000,
          });
          navigator("/shop",{replace : true})
          getBasket();
        }
      });
    },
  });

  const getBasket = () => {
    basketService.getBasket().then((response) => {
      if (response.statusCode !== 200) {
        toast.error(response.description, {
          position: "top-left",
          autoClose: 3000,
        });
      } else {
        setBasket(response.data);
      }
    });
  };

  return (
    <div className="grid sm:px-10 lg:grid-cols-2">
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Siparis Özeti</p>
        <p className="text-gray-400">
          Ürünlerinizi kontrol edin ve uygun bir kargo yöntemi seçin.
        </p>

        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          {basket.basketProducts?.map((basketProduct) => (
            <div key={basketProduct.id} className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md object-contain"
                src={
                  basketProduct.product?.image
                    ? basketProduct.product?.image
                    : defaultImage
                }
                alt=""
              />
              <div className="w-full flex flex-col px-4 py-4">
                <span className="font-semibold">
                  {basketProduct.product?.name}
                </span>
                <span className="text-gray-400 mt-1">
                  {basketProduct.quantity} Adet
                </span>
                <p className="text-lg font-bold mt-2">
                  TRY {basketProduct.totalAmount?.toLocaleString("tr-TR")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-lg font-medium">Kargo Seçenekleri</p>

        <div className="relative">
          <input
            className="peer hidden"
            id="radio_1"
            type="radio"
            name="radio"
            defaultChecked={true}
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            htmlFor="radio_1"
          >
            <img
              className="w-14 object-contain"
              src="https://seeklogo.com/images/P/PTT-logo-15A99DF712-seeklogo.com.png"
              alt=""
            />
            <div className="ml-5">
              <span className="mt-2 font-semibold">PTT Kargo</span>
              <p className="text-slate-500 text-sm leading-6">
                Tahmini Teslim: 2-4 Gün
              </p>
            </div>
          </label>
        </div>
      </div>
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Ödeme Bilgileri</p>
        <p className="text-gray-400">
          Ödeme bilgilerinizi girerek siparişinizi tamamlayın.
        </p>
        <div>
          <label
            htmlFor="billing-address"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Gönderi Adresi
          </label>
          <div className="relative">
            <input
              type="text"
              id="delivery-address"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Tam Adres"
              required
              onChange={(e) => {
                formik.setFieldValue("deliveryAddress", e.target.value);
              }}
              value={formik.values.deliveryAddress}
              onBlur={formik.handleBlur}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <img
                className="h-4 w-4 object-contain"
                src="https://flagcdn.com/w20/tr.png"
                alt=""
              />
            </div>
          </div>
          {submitted &&
            formik.touched.deliveryAddress &&
            formik.errors.deliveryAddress && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.deliveryAddress}
              </p>
            )}
          <label
            htmlFor="billing-address"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Fatura Adresi
          </label>
          <div className="relative">
            <input
              type="text"
              id="billing-address"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Tam Adres"
              required
              onChange={(e) => {
                formik.setFieldValue("billingAddress", e.target.value);
              }}
              value={formik.values.billingAddress}
              onBlur={formik.handleBlur}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <img
                className="h-4 w-4 object-contain"
                src="https://flagcdn.com/w20/tr.png"
                alt=""
              />
            </div>
          </div>
          {submitted &&
            formik.touched.billingAddress &&
            formik.errors.billingAddress && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.billingAddress}
              </p>
            )}
          <label
            htmlFor="card-holder"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Kart Üzerinde Yazan İsim{" "}
            <span className="text-sm text-red-500">(DEVRE DISI)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="card-holder"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Kartın Üzerinde Yazan İsim"
              readOnly
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
            </div>
          </div>
          <label
            htmlFor="card-no"
            className="mt-4 mb-2 block text-sm font-medium"
            aria-readonly
          >
            Kart Bilgileri{" "}
            <span className="text-sm text-red-500">(DEVRE DISI)</span>
          </label>
          <div className="flex">
            <div className="relative w-7/12 flex-shrink-0">
              <input
                type="text"
                id="card-no"
                className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                readOnly
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                </svg>
              </div>
            </div>
            <input
              type="text"
              className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="MM/YY"
              readOnly
            />
            <input
              type="text"
              className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="CVC"
              readOnly
            />
          </div>
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Alt Toplam</p>
              <p className="font-semibold text-gray-900">
                TRY {basket?.totalAmount?.toLocaleString("tr-TR")}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Kargo</p>
              <p className="font-semibold text-gray-900"> TRY 0.00</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Toplam</p>
            <p className="text-2xl font-semibold text-gray-900">
              TRY {basket?.totalAmount?.toLocaleString("tr-TR")}
            </p>
          </div>
        </div>
        <button
          className="mt-4 mb-8 w-full rounded-md bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => {
            handleSubmit();
          }}
        >
          Sipariş Oluştur.
        </button>
      </div>
    </div>
  );
};

export default Checkout;
