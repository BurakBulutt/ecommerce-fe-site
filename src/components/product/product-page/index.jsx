import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "../../../services/productservice/ProductService";
import { toast } from "react-toastify";
import Quantity from "../quantity";
import { BasketContext } from "../../context/BasketContext";
import { BasketService } from "../../../services/basketservice/BasketService";
import { FavoriteProductService } from "../../../services/favoriteproductservice/FavoriteProductService";

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
  const favoriteProductService = new FavoriteProductService();
  const [favorite, setFavorite] = useState();

  useEffect(() => {
    getProduct(id);
  }, []);

  useEffect(() => {
    if (product?.id) {
      checkFavorite(product?.id);
    }
  }, [product]);

  const getProduct = (id) => {
    service.getBySlug(id).then((response) => {
      if (response.statusCode === 200) {
        setProduct(response.data);
      } else {
        toast.error(response.description, {
          position: "top-left",
          autoClose: 3000,
        });
      }
    });
  };

  const checkFavorite = (id) => {
    favoriteProductService
      .checkFavorite(id)
      .then((response) => {
        if (response.statusCode === 200) {
          setFavorite(response.data);
        } else {
          setFavorite(null);
        }
      })
      .catch((error) => {
        toast.error("Bilinmeyen Hata", {
          position: "top-left",
          autoClose: 3000,
        });

        console.log(error);
      });
  };

  const deleteFavorite = (id) => {
    favoriteProductService
      .deleteFavorite(id)
      .then((response) => {
        if (response.statusCode !== 200) {
          toast.error(`Bilinmeyen Hata : ${response.description}`, {
            position: "top-left",
            autoClose: 3000,
          });
        } else {
          setFavorite(null);
          toast.error(`${response.description} -> Ürün Favorilerden Kaldırıldı`, {
            position: "top-left",
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(`Bilinmeyen Hata : 500`, {
          position: "top-left",
          autoClose: 3000,
        });
        console.error(error);
      });
  };

  const saveFavorite = (request) => {
    favoriteProductService
      .save(request)
      .then((response) => {
        if (response.statusCode !== 200) {
          toast.error(`Bilinmeyen Hata : ${response.description}`, {
            position: "top-left",
            autoClose: 3000,
          });
        } else {
          setFavorite(response.data);
          toast.success(`${response.description} -> Ürün Favorilere Eklendi`, {
            position: "top-left",
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(`Bilinmeyen Hata : 500`, {
          position: "top-left",
          autoClose: 3000,
        });
        console.error(error);
      });
  };

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

  const toggleFavorite = () => {
    if (favorite) {
      deleteFavorite(favorite?.id);
    } else {
      const request = {
        productId: product?.id,
      };
      saveFavorite(request);
    }
  };

  return (
    <div className="bg-white py-16">
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
            {product?.productDiscounts.length ? (
              <div className="flex flex-col gap-2 items-start py-4">
                <div className="flex items-center gap-2">
                  <p className="text-xl font-semibold" style={{ color: "red" }}>
                    TRY {product?.priceAfterDiscount.toLocaleString("tr-TR")}
                  </p>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 256 256"
                    className="text-red-600"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(180deg)" }}
                  >
                    <path d="M236.78,211.81A24.34,24.34,0,0,1,215.45,224H40.55a24.34,24.34,0,0,1-21.33-12.19,23.51,23.51,0,0,1,0-23.72L106.65,36.22a24.76,24.76,0,0,1,42.7,0L236.8,188.09A23.51,23.51,0,0,1,236.78,211.81Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-3 p-3 bg-white border-gray-200 border-2">
                  {product?.productDiscounts.map((item) => (
                    <p className="flex gap-2 items-start justify-between">
                      <span className="text-sm text-gray-500 font-normal">
                        {item.name}
                        <span className="text-red-500">
                          {" "}
                          {item.discount}{" "}
                          {item.priceEffect === "PRICE" ? " TRY" : " %"} İndirim
                        </span>
                      </span>
                      <span className="text-sm text-gray-500 line-through font-normal">
                        TRY {item.priceWithoutDiscount}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-4 text-2xl tracking-tight text-gray-900">
                TRY {product?.originalPrice.toLocaleString("tr-TR")}
              </p>
            )}
            {/* Quantity and Add to Cart button side by side */}
            {product?.quantity >= 1 ? (
              <div className="flex items-center mt-6">
                {/* Quantity input, daha küçük genişlik */}
                <div
                  className="flex flex-grow justify-start"
                  style={{ flex: 1 }}
                >
                  <Quantity
                    changeQuantity={changeQuantity}
                    quantity={quantity}
                  />
                </div>
                {/* Sepete Ekle butonu, daha büyük genişlik */}
                <button
                  className="flex flex-grow ml-2 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  style={{ flex: 3 }}
                  onClick={addToBasket}
                >
                  Sepete Ekle
                </button>
                {/* Kalp butonu */}
                <button
                  className="flex items-end justify-center border border-gray-100 rounded-lg p-3 shadow-lg ml-2"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={toggleFavorite}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={favorite ? "#ff0000" : "#1D4ED8"}
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 4.248c-3.148-5.402-12-3.735-12 3.636 0 3.317 2.686 6.43 6 8.916l6 4.635 6-4.635c3.314-2.486 6-5.599 6-8.916 0-7.37-8.852-9.038-12-3.636z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center mt-6">
                {/* Sepete Ekle butonu, daha büyük genişlik */}
                <button
                  className="flex flex-grow ml-2 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  style={{ flex: 3 }}
                  disabled
                >
                  Ürün Stoğu Bulunmuyor
                </button>
                <button
                  className="flex items-end justify-center border border-gray-100 rounded-lg p-3 shadow-lg ml-2"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={toggleFavorite}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={favorite ? "#ff0000" : "#1D4ED8"}
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 4.248c-3.148-5.402-12-3.735-12 3.636 0 3.317 2.686 6.43 6 8.916l6 4.635 6-4.635c3.314-2.486 6-5.599 6-8.916 0-7.37-8.852-9.038-12-3.636z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
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
