import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={'<<'}
      nextLabel={'>>'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={styles.pagination}
      pageLinkClassName={styles.pageLink}
      activeLinkClassName={styles.active}
      disabledLinkClassName={styles.disabledLink}
      previousLinkClassName={styles.previousButton}
      nextLinkClassName={styles.nextButton}
    />
  );
};

export default Pagination;
