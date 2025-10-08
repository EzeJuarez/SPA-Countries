import '../styles/Pagination.css';

const Pagination = ({ currentPage, setCurrentPage, allCountries }) => {
  const numberOfPages = Math.ceil(((allCountries?.length - 9) / 10) + 1);
  numberOfPages < currentPage && setCurrentPage(1);

  const pages = () => {
    const arrayOfPages = [1];
    let count = 1;
    while (count < numberOfPages) {
      count++;
      arrayOfPages.push(count);
    };
    return arrayOfPages;
  };

  return (
    <>
      { numberOfPages > 1 &&
        <div className='pagination'>
          <button
            disabled={currentPage === 1}
            className={currentPage === 1 ? 'disabled' : 'change-page'}
            onClick={() => setCurrentPage(currentPage - 1)}
          > <i className="ti ti-arrow-badge-left-filled"></i> </button>

          <div className='pages-container'>
            {
              pages().map(page =>
                <button
                  disabled={currentPage === page}
                  key={page}
                  className={currentPage === page ? 'selected' : 'number-page'}
                  onClick={() => setCurrentPage(page)}
                > {page} </button>
              )
            }
          </div>

          <button
            disabled={currentPage === numberOfPages}
            className={currentPage === numberOfPages ? 'disabled' : 'change-page'}
            onClick={() => setCurrentPage(currentPage + 1)}
          > <i className="ti ti-arrow-badge-right-filled"></i> </button>
        </div>
      }
    </>
  );
};

export default Pagination;
