import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ProductContainer from "../product/product-container";
import CategoryTree from "../category";
import { CategoryService } from "../../services/categoryservice/CategoryService";
import { ProductService } from "../../services/productservice/ProductService";
import Paginator from "../product/paginator";
import NotFoundComponent from "../404";

const Shop = () => {
  const [categoryTree, setCategoryTree] = useState([]);
  const [productPage, setProductPage] = useState();
  const categoryService = new CategoryService();
  const productService = new ProductService();
  const token = Cookies.get("token");
  const [totalElement, setTotalElement] = useState(0);
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState();

  useEffect(() => {
    if (token !== undefined) {
      getCategories();
      getProductPage(currentPage, selectedCategorySlug);
    }
  }, [token, currentPage, selectedCategorySlug]);

  const getCategories = () => {
    categoryService.getCategoryTree().then((response) => {
      if (response.statusCode === 200) {
        setCategoryTree(response.data.items);
      }
    });
  };

  const getProductPage = (page, selectedCategorySlug) => {
    productService
      .productFilter({
        page: page,
        size: pageSize,
        categorySlug: selectedCategorySlug,
      })
      .then((response) => {
        if (response.statusCode === 200) {
          setProductPage(response.data.items);
          setTotalElement(response.data.items.totalElements);
        }
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSelectCategory = (slug) => {
    setSelectedCategorySlug(slug);
  };

  return (
    <div className="flex flex-col min-h-screen text-heading">
      {token !== undefined ? (
        <>
          <div className="border-b border-default pt-6 py-10">
            <div className="container mx-auto space-y-5"></div>
          </div>
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="lg:col-span-3 col-span-12 space-y-4 pt-6">
                <div className="space-y-3 pb-5">
                  <CategoryTree
                    categories={categoryTree}
                    onSelectCategory={handleSelectCategory}
                    selectedCategorySlug={selectedCategorySlug}
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <div className="flex justify-between items-center border-t border-b border-border-default py-6">
                  <p className="text-sm text-body">{totalElement} Ürün</p>
                </div>
                <ProductContainer products={productPage} />
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
        </>
      ) : (
        <NotFoundComponent/>
      )}
    </div>
  );
};

export default Shop;
