import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <ReactPaginate
      previousLabel={'<<'}
      nextLabel={'>>'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      // 현재 페이지 설정 (ReactPaginate는 0부터 시작하므로 1을 빼준다.)
      forcePage={currentPage - 1}
      // 스타일
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
