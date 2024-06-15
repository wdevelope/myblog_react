import styles from './HomePage.module.css';
import { FaPencilAlt, FaDiscord, FaRocket, FaUser, FaAngleDoubleUp, FaBrain } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestVisitors, setLatestVisitors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 최신 게시글 데이터를 가져오는 함수
    const fetchLatestPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/post/latest`);
        if (!response.ok) {
          throw new Error('서버 오류가 발생했습니다.');
        }
        const data = await response.json();
        setLatestPosts(data);
      } catch (err) {
        console.error('게시글을 불러오는 데 실패했습니다.', err);
      }
    };

    // 최신 방명록 데이터를 가져오는 함수
    const fetchLatestVisitors = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/visitor/latest`);
        if (!response.ok) {
          throw new Error('서버 오류가 발생했습니다.');
        }
        const data = await response.json();
        setLatestVisitors(data);
      } catch (err) {
        console.error('방명록을 불러오는 데 실패했습니다.', err);
      }
    };

    fetchLatestPosts();
    fetchLatestVisitors();
  }, []);

  // 게시글 아이템 클릭 핸들러
  const handlePostClick = (subCategoryName) => {
    navigate(`/${subCategoryName}`);
  };

  // 방명록 아이템 클릭 핸들러
  const handleVisitorClick = () => {
    navigate('/visitor');
  };

  // 날짜 형식
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('ko-KR', options);

    // 마지막 '.' 제거
    return formattedDate.replace(/\.$/, '');
  };

  return (
    <main className={styles.homeContainer}>
      <section className={styles.homeMain}>
        <h2>
          <FaRocket />
          w-life 블로그에 오신 것을 환영합니다.
        </h2>
        <p>본 블로그는 2023년부터 개인적인 일기, 개발일지 등 글쓰기 공간으로 사용할 예정입니다.</p>
        <h3>
          <FaPencilAlt />
          study
        </h3>
        <ul>
          <li>
            <strong>web:</strong> 웹개발 학습 정리 자료입니다.
          </li>
          <li>
            <strong>algorithm:</strong> 알고리즘 학습 정리 자료입니다.
          </li>
          <li>
            <strong>etc:</strong> 기타 학습 정리 자료입니다.
          </li>
        </ul>
        <h3>
          <FaDiscord /> hobby
        </h3>
        <ul>
          <li>
            <strong>exercise :</strong> 운동 일지입니다.
          </li>
          <li>
            <strong>movie :</strong> 영화 이야기 입니다.
          </li>
          <li>
            <strong>book :</strong> 책 이야기 입니다.
          </li>
        </ul>
        <h3>
          <FaBrain />
          Life
        </h3>
        <ul>
          <li>
            <strong>diary :</strong> 소소한 일기입니다.
          </li>
          <li>
            <strong>job :</strong> 직업 관련 이야기입니다.
          </li>
        </ul>
        <h3>
          <FaAngleDoubleUp />
          version
        </h3>
        <ul>
          <li>블로그 개선 버전관리입니다.</li>
        </ul>
        <h3>
          <FaUser />
          Visitor
        </h3>
        <span>방명록 게시판입니다.</span>
      </section>
      <aside className={styles.homeAside}>
        {/* 최신 게시글 목록 렌더링 */}
        <h3>
          <FaPencilAlt />
          &nbsp; 최신 게시글
        </h3>
        <ul>
          {latestPosts.map((post) => (
            <li key={post.id} onClick={() => handlePostClick(post.subCategory.name)} className={styles.postItem}>
              <span className={styles.postTitle}>{post.title}</span>
              <span className={styles.postDate}>{formatDate(post.createdAt)}</span>
            </li>
          ))}
        </ul>

        {/* 최신 방명록 목록 렌더링 */}
        <h3 className={styles.latestVisitors}>
          <FaUser />
          &nbsp; 최신 방명록
        </h3>
        <ul>
          {latestVisitors.map((visitor) => (
            <li key={visitor.id} onClick={handleVisitorClick} className={styles.visitorItem}>
              <span className={styles.visitorTitle}>{visitor.title}</span>
              <span className={styles.visitorDate}>{formatDate(visitor.createdAt)}</span>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}
