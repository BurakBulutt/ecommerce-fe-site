import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../assets/logo1.svg"
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { ProductService } from "../../services/productservice/ProductService";
import Basket from "../basket";
import { ApplicationContext } from "../../context/ApplicationContext";


const Navigation = () => {
  const [loginState, setLoginState] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigator = useNavigate();
  const productService = new ProductService();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [basketVisibility, setBasketVisibility] = useState(false);
  const { basket,token} = useContext(ApplicationContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (token) {
      setLoginState(true);
    }
  }, [token]);

  const onUserClickHandler = () => {
    Cookies.remove("token");
    setLoginState(false);
    navigator("/", { replace: true });
  };

  const onChangeHandler = (e) => {
    const params = {
      key : e.target.value,
      page : 0,
      size : 5
    }
    productService.searchFilter(params).then((response) => {
      if (response.statusCode === 200) {
        console.log(response.data.items)
        setSearchedProducts(response.data?.items?.content);
      }
    });
  };

  const getProduct = (product) => {
    navigator(`/products/${product.slug}`);
    window.location.reload();
  };

  const openCloseBasket = (bool) => {
    setBasketVisibility(bool);
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Sol Kısım: Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-16 max-w-full transition-transform duration-300 ease-in-out hover:scale-110 p-2"
            style={{ maxHeight: "8rem" }}
          />
        </Link>

        {/* Orta Kısım: Arama Kutusu */}
        <div className="flex-grow mx-8 max-w-xs max-h-8 z-50">
          <input
            type="text"
            placeholder="Ara..."
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChangeHandler}
            onBlur={() => setTimeout(() => setSearchedProducts([]), 300)}
          />
          {/* Arama Sonuçları */}
          {searchedProducts.length > 0 && (
            <ul className="left-0 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
              {searchedProducts.map((product, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer z-10"
                  onClick={() => {
                    getProduct(product);
                  }}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {!loginState ? (
          <div className="flex items-center space-x-6">
            <Link to="/login">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
                Giriş Yap
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
                Kayıt Ol
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-6 relative">
            {/* Sepet İkonu */}
            <button
              onClick={() => {
                if (basketVisibility) {
                  setBasketVisibility(false);
                } else {
                  setBasketVisibility(true);
                }
              }}
              className="relative text-2xl text-gray-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-200 active:bg-gray-300 rounded-full p-2"
            >
              <FaShoppingCart />
              {/* Sepet Ürün Sayısı */}
              {basket?.basketProducts?.length > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-blue-500 rounded-full">
                  {basket?.basketProducts?.length}
                </span>
              )}
            </button>
            <Basket
              visibility={basketVisibility}
              openCloseBasket={openCloseBasket}
            />
            {/* Kullanıcı İkonu */}
            <div className="relative">
              <button
                className="text-2xl text-gray-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-200 active:bg-gray-300 rounded-full p-2"
                onClick={toggleDropdown}
              >
                <FaUser />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  <Link
                    to="/orders/my-orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Siparişlerim
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => {
                      onUserClickHandler();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
