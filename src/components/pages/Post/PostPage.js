import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './PostPage.module.css';
import Pagination from '../../common/Pagination';
import { useUserContext } from '../../../store/UserContext';
import SearchComponent from '../../common/SearchComponent';
import { FaLock } from 'react-icons/fa';

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { subCategoryName } = useParams();
  const { userInfo } = useUserContext();
  const status = userInfo.status;

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(query.get('page'), 10);
    const keyword = query.get('keyword');

    if (pageFromUrl && !isNaN(pageFromUrl)) {
      setCurrentPage(pageFromUrl);
    }

    const fetchPosts = async () => {
      try {
        let url = `${process.env.REACT_APP_SERVER_URL}/api/post?page=${currentPage}&subCategoryName=${subCategoryName}`;

        if (keyword) {
          url = `${process.env.REACT_APP_SERVER_URL}/api/post/search?page=${pageFromUrl}&keyword=${encodeURIComponent(
            keyword
          )}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();

        const totalCount = data.meta.totalCount;
        const postData = data.posts.map((post, index) => ({
          ...post,
          index: totalCount - index - (currentPage - 1) * 15,
        }));
        setPosts(postData);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, [currentPage, subCategoryName, location.search]);

  // 다른 게시판 이동시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [subCategoryName]);

  // 페이지 네이션
  const handlePageClick = (event) => {
    const selectedPage = Number(event.selected) + 1;
    setCurrentPage(selectedPage);
    navigate(`?page=${selectedPage}`);
  };

  // 글쓰기 페이지 이동
  const goToWrite = () => {
    if (status === 'admin') {
      navigate(`/${subCategoryName}/post/write`);
    } else {
      alert('게시판 글쓰기는 관리자만 가능합니다.');
    }
  };

  // 글 상세 페이지 이동
  const goToPost = async (id) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/view/post/${id}`, {
      method: 'POST',
      credentials: 'include',
    });
    navigate(`/${subCategoryName}/post/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '').split(' ').join('. ');
  };

  return (
    <div className={styles.postDiv}>
      <header className={styles.titleBox}>
        <h2>{subCategoryName}</h2>
        <button className={styles.writeButton} onClick={goToWrite}>
          글쓰기
        </button>
      </header>
      <table className={styles.postTable}>
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
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.index}</td>
              <td onClick={() => goToPost(post.id)} className={styles.postTitle}>
                {post.accessLevel !== 0 && <FaLock />}
                {post.title}
              </td>
              <td>{post.user.name}</td>
              <td>{formatDate(post.createdAt)}</td>
              <td>{post.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pageCount={totalPages} currentPage={currentPage} onPageChange={handlePageClick} />
      <div>
        <SearchComponent />
      </div>
    </div>
  );
}
