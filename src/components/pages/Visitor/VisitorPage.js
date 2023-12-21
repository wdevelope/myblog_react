import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../../../store/UserContext';
import styles from './VisitorPage.module.css';
import Pagination from '../../common/Pagination';

export default function VisitorPage() {
  const [visitors, setVisitors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useUserContext();
  const status = userInfo.status;

  useEffect(() => {
    // URL에서 페이지 번호 가져오기
    const query = new URLSearchParams(location.search);
    const pageFromURL = parseInt(query.get('page'), 10);

    if (pageFromURL && !isNaN(pageFromURL)) {
      setCurrentPage(pageFromURL);
    }

    // 방명록 데이터 가져오기
    const fetchVisitors = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/visitor?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch visitors');
        }
        const data = await response.json();
        setVisitors(data.visitors);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.log('오류 발생', error);
      }
    };

    fetchVisitors();
  }, [location.search, currentPage]);

  const handlePageClick = (event) => {
    const selectedPage = Number(event.selected) + 1;
    setCurrentPage(selectedPage);
    navigate(`?page=${selectedPage}`);
  };

  const goToWrite = () => {
    console.log('이거찍힘?');
    console.log(status);
    if (status === 'user') {
      navigate('/visitor/write');
    } else {
      alert('방명록 쓰기는 로그인을 해주세요.');
    }
  };

  const goToInfo = (id) => {
    navigate(`/visitor/${id}`);
  };

  return (
    <div className={styles.visitorDiv}>
      <header className={styles.titleBox}>
        <h2>방명록</h2>
        <button className={styles.writeButton} onClick={goToWrite}>
          글쓰기
        </button>
      </header>
      <table className={styles.visitorTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor.id}>
              <td>{visitor.id}</td>
              <td onClick={() => goToInfo(visitor.id)} className={styles.visitorTitle}>
                {visitor.title}
              </td>
              <td>{visitor.user.name}</td>
              <td>{new Date(visitor.createdAt).toLocaleDateString()}</td>
              <td>{visitor.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pageCount={totalPages} onPageChange={handlePageClick} />
    </div>
  );
}
