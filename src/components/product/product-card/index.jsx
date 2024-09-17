const ProductCard = ({product,onClick}) => {
  const emptyImage =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg";

    return (
      <div className="overflow-hidden border-none shadow-none rounded-none flex flex-col justify-center items-center"
      onClick={onClick} style={{cursor : 'pointer'}}>
        <div className="overflow-hidden max-w-64 max-h-64">
          <img
            alt={product.name}
            src={product.image !== undefined ? product.image : emptyImage}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="overflow-hidden max-w-64 mt-4">
          <div className="text-center">
            <span className="text-md font-bold mb-2.5">
              {product.name}
            </span>
            <p className="text-xs text-body flex flex-wrap justify-center gap-2">
              <span className="text-base font-bold text-black"> TRY {product.price.toLocaleString('tr-TR')}</span>
            </p>
          </div>
        </div>
      </div>
    );
    
};
export default ProductCard;
