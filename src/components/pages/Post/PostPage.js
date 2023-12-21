import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './PostPage.module.css';
import Pagination from '../../common/Pagination';

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { subCategoryName } = useParams();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(query.get('page'), 10);

    if (pageFromUrl && !isNaN(pageFromUrl)) {
      setCurrentPage(pageFromUrl);
    }
  }, [location.search, subCategoryName]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/post?page=${currentPage}&subCategoryName=${subCategoryName}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.posts);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, [currentPage, subCategoryName]); // currentPage와 subCategoryName을 의존성 배열에 추가

  const handlePageClick = (event) => {
    const selectedPage = Number(event.selected) + 1;
    setCurrentPage(selectedPage);
    navigate(`?page=${selectedPage}`);
  };

  const goToWrite = () => {
    navigate(`/${subCategoryName}/post/write`);
  };

  const goToPost = (id) => {
    navigate(`/${subCategoryName}/post/${id}`);
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
              <td>{post.id}</td>
              <td onClick={() => goToPost(post.id)} className={styles.postTitle}>
                {post.title}
              </td>
              <td>{post.user.name}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td>{post.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pageCount={totalPages} onPageChange={handlePageClick} />
    </div>
  );
}
