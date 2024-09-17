const Paginator = ({ currentPage, totalItems, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
  
    const handlePrevious = () => {
      if (currentPage > 0) onPageChange(currentPage - 1);
    };
  
    const handleNext = () => {
      if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
    };
  
    return (
      <div className="flex space-x-2">
        <button
          onClick={handlePrevious}
          className={`px-4 py-2 border ${currentPage === 0 ? "opacity-50" : ""}`}
          disabled={currentPage === 0}
        >
          Önceki
        </button>
        <span className="px-4 py-2">{currentPage + 1} / {totalPages}</span>
        <button
          onClick={handleNext}
          className={`px-4 py-2 border ${currentPage === totalPages - 1 ? "opacity-50" : ""}`}
          disabled={currentPage === totalPages - 1}
        >
          Sonraki
        </button>
      </div>
    );
  };
  
  export default Paginator;
  