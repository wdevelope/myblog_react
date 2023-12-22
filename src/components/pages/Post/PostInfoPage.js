import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './PostInfoPage.module.css';

export default function PostInfoPage() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    user: { name: '' },
    createdAt: '',
  });
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/post/${postId}`);
        const data = await response.json();
        setPost({
          ...data,
          createdAt: new Date(data.createdAt).toLocaleDateString(),
        });
      } catch (error) {
        console.error('Error fetching post detail', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const goBack = () => {
    navigate(-1);
  };

  const deletePost = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/post/${postId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (response.status === 200) {
          alert('게시물이 삭제되었습니다.');
          navigate(-1);
        } else {
          alert(`삭제 실패: ${data.errorMessage}`);
        }
      } catch (error) {
        console.error('게시물 삭제 서버 에러', error);
        alert('게시물 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className={styles.postInfoBox}>
      <div className={styles.postInfoButtonBox}>
        <button onClick={goBack}>
          <FaArrowLeft />
        </button>
        <button onClick={deletePost}>Delete</button>
      </div>

      <h2 className={styles.postInfoTitle}>{post.title}</h2>
      <p>
        {post.user.name} | {post.createdAt}
      </p>
      <div className={styles.postInfoContent} dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
