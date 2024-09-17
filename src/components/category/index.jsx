import React, { useState } from "react";

const CategoryTree = ({ categories, selectedCategorySlug, onSelectCategory }) => {
  // Açık/kapalı durumunu yönetmek için bir state oluşturuyoruz
  const [expandedCategories, setExpandedCategories] = useState({});
  
  // Kategori açma/kapama işlemi
  const toggleCategory = (id) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Kategori açık mı kapalı mı kontrolü
    }));
  };

  // Kategori seçme işlemi
  const handleSelectCategory = (slug) => {
    if (slug === selectedCategorySlug) {
      onSelectCategory(undefined); // Aynı kategoriye tıklandıysa seçimi sıfırla
    } else {
      onSelectCategory(slug); // Farklı kategoriye tıklandıysa onu seç
    }
  };

  const renderTree = (items = []) => {
    return (
      <ul className="ml-4 border-l border-gray-300 pl-4">
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            <div className="flex items-center justify-between">
              <span
                className={`text-gray-600 hover:underline cursor-pointer text-sm ${
                  selectedCategorySlug === item.slug ? "font-bold" : ""
                }`} // Seçilen kategori ise yazı tipi bold olacak
                onClick={() => handleSelectCategory(item.slug)}
              >
                {/* Yazı boyutu küçültüldü */}
                {item.name}
              </span>
              {/* Eğer child kategorileri varsa + veya - işaretini göster */}
              {item.childrensList.length > 0 && (
                <button
                  onClick={() => toggleCategory(item.id)}
                  className="ml-2 text-sm"
                >
                  {/* Kategori açıkken "-" simgesi, kapalıyken "+" simgesi */}
                  {expandedCategories[item.id] ? (
                    <span className="text-xl">-</span>
                  ) : (
                    <span className="text-xl">+</span>
                  )}
                </button>
              )}
            </div>

            {/* Eğer kategori açıksa child kategorileri gösteriyoruz */}
            {expandedCategories[item.id] && item.childrensList.length > 0 && (
              <div className="ml-2">{renderTree(item.childrensList)}</div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Kategoriler</h2>
      {categories.length > 0 ? (
        renderTree(categories)
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default CategoryTree;
