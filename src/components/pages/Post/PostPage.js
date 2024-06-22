import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './PostPage.module.css';
import Pagination from '../../common/Pagination';
import { useUserContext } from '../../../store/UserContext';
import SearchComponent from '../../common/SearchComponent';
import { FaLock } from 'react-icons/fa';

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { subCategoryName } = useParams();
  const { userInfo } = useUserContext();
  const status = userInfo.status;

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(query.get('page'), 10);
    if (pageFromUrl && !isNaN(pageFromUrl)) {
      setCurrentPage(pageFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(query.get('page'), 10) || currentPage;
        const keyword = query.get('keyword');
        let url = `${process.env.REACT_APP_SERVER_URL}/api/post?page=${pageFromUrl}&subCategoryName=${subCategoryName}`;

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
        setPosts(
          data.posts.map((post, index) => ({
            ...post,
            index: data.meta.totalCount - index - (pageFromUrl - 1) * 15,
          }))
        );
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, [currentPage, subCategoryName, location.search]);

  const handlePageClick = (selectedPage) => {
    const newPage = selectedPage.selected + 1;
    setCurrentPage(newPage);
    navigate(`?page=${newPage}`);
  };

  const goToWrite = () => {
    if (status === 'admin') {
      navigate(`/${subCategoryName}/post/write`);
    } else {
      alert('게시판 글쓰기는 관리자만 가능합니다.');
    }
  };

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
