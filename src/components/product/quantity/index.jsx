
const Quantity = ({ changeQuantity, quantity }) => {
  // Arttırma işlemi
  const increment = () => {
    const newValue = quantity + 1;
    changeQuantity(newValue); // Parent component'e bildir
  };

  // Azaltma işlemi
  const decrement = () => {
    const newValue = quantity - 1;
    changeQuantity(newValue); // Parent component'e bildir
  };

  return (
    <div className="flex items-center">
      <button
        className="px-3 py-2 text-lg bg-gray-100 text-gray-500 border border-gray-300 text-center hover:bg-gray-200 hover:text-gray-700 rounded-l-md focus:outline-none"
        onClick={decrement}
      >
        &mdash;
      </button>
      <input
        className="w-12 px-2 py-2 text-lg text-center border-t border-b border-gray-300 focus:outline-none"
        type="text"
        value={quantity}
        readOnly
      />
      <button
        className="px-3 py-2 text-lg bg-gray-100 text-gray-500 border border-gray-300 text-center hover:bg-gray-200 hover:text-gray-700 rounded-r-md focus:outline-none"
        onClick={increment}
      >
        &#xff0b;
      </button>
    </div>
  );
};

export default Quantity;
