import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../../../store/UserContext';
import styles from './VisitorPage.module.css';
import Pagination from '../../common/Pagination';
import { FaLock } from 'react-icons/fa';

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
        const response = await fetch(`/api/visitor?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch visitors');
        }
        const data = await response.json();
        const totalCount = data.meta.totalCount; // 전체 게시글 수
        const visitorData = data.visitors.map((visitor, index) => ({
          ...visitor,
          index: totalCount - index - (currentPage - 1) * 15, // 게시글 번호 계산
        }));
        setVisitors(visitorData);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error('오류 발생', error);
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
    if (status === 'user') {
      navigate('/visitor/write');
    } else {
      alert('방명록 쓰기는 로그인을 해주세요.');
    }
  };

  // 방명록 상세게시판 이동
  const goToInfo = async (visitor) => {
    if (visitor.isPrivate) {
      const password = prompt('비밀번호를 입력해주세요:');
      if (!password) return;

      const response = await fetch(`/api/visitor/${visitor.id}/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        await fetch(`/api/view/visitor/${visitor.id}`, {
          method: 'POST',
          credentials: 'include',
        });
        navigate(`/visitor/${visitor.id}`, { state: { password } });
      } else {
        alert('비밀번호가 틀렸습니다.');
      }
    } else {
      await fetch(`/api/view/visitor/${visitor.id}`, {
        method: 'POST',
        credentials: 'include',
      });
      navigate(`/visitor/${visitor.id}`);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '').split(' ').join('. ');
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
              <td>{visitor.index}</td>
              <td onClick={() => goToInfo(visitor)} className={styles.visitorTitle}>
                {visitor.isPrivate && <FaLock />}
                {visitor.title}
              </td>
              <td>{visitor.user.name}</td>
              <td>{formatDate(visitor.createdAt)}</td>
              <td>{visitor.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 0 && <Pagination pageCount={totalPages} currentPage={currentPage} onPageChange={handlePageClick} />}{' '}
    </div>
  );
}
