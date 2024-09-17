import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "../../../services/productservice/ProductService";
import { toast } from "react-toastify";
import Quantity from "../quantity";
import { BasketContext } from "../../context/BasketContext";
import { BasketService } from "../../../services/basketservice/BasketService";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const service = new ProductService();
  const [quantity, setQuantity] = useState(1);
  const basketService = new BasketService();
  const { setBasket } = useContext(BasketContext);
  const { token } = useContext(BasketContext);
  const defaultImage =
    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";

  useEffect(() => {
    service.getBySlug(id).then((response) => {
      if (response.statusCode === 200) {
        setProduct(response.data);
        console.log(product);
      } else {
        toast.error(response.description, {
          position: "top-left",
          autoClose: 3000,
        });
      }
    });
  }, []);

  const changeQuantity = (count) => {
    if (count <= 0) {
      return;
    }
    if (count > product.quantity) {
      toast.error("Ürün Adeti Yetersiz!", {
        position: "top-left",
        autoClose: 3000,
      });
    } else {
      setQuantity(count);
    }
  };

  const addToBasket = () => {
    if (token) {
      const request = {
        productId: product.id,
        quantity: quantity,
      };

      basketService.addProduct(request).then((response) => {
        if (response.statusCode === 200) {
          setBasket(response.data);

          toast.success("Ürün Başarıyla Eklendi", {
            position: "top-left",
            autoClose: 3000,
          });
        }
      });
    } else {
      toast.error("Sepete Eklemek İçin Giriş Yapmalasınız", {
        position: "top-left",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image and product info side by side */}
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image gallery */}
          <div className="overflow-hidden rounded-lg">
            <img
              alt=""
              src={product?.image ? product?.image : defaultImage}
              className="w-full h-128 object-cover object-center"
            />
          </div>

          {/* Product info */}
          <div className="lg:pl-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product?.name}
            </h1>

            {/* Price */}
            <p className="mt-4 text-2xl tracking-tight text-gray-900">
              TRY {product?.price.toLocaleString("tr-TR")}
            </p>

            {/* Quantity and Add to Cart button side by side */}
            <div className="flex items-center mt-6">
              {/* Quantity input, daha küçük genişlik */}
              <div className="flex flex-grow justify-start" style={{ flex: 1 }}>
                <Quantity changeQuantity={changeQuantity} quantity={quantity} />
              </div>
              {/* Sepete Ekle butonu, daha büyük genişlik */}
              <button
                className="flex flex-grow ml-2 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                style={{ flex: 3 }} // Butonun genişliğini Quantity'ye göre 3 kat artırıyoruz
                onClick={addToBasket}
              >
                Sepete Ekle
              </button>
            </div>

            {/* Product description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">Açıklama</h3>
              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-900">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
