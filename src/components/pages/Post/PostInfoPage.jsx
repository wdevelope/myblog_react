import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './PostInfoPage.module.css';
import { useUserContext } from '../../../store/UserContext';
import CustomReactQuill from '../../common/CustomReactQuill';

export default function PostInfoPage() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    user: { name: '' },
    createdAt: '',
  });
  const { postId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useUserContext();
  const { status } = userInfo;

  // 게시글 렌더링
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`/api/post/${postId}`, {
          credentials: 'include',
        });

        if (response.status !== 200) {
          // 에러 응답 처리
          const errorData = await response.json();
          alert(errorData.errorMessage || '게시글 조회 권한이 없습니다.');
          navigate(-1);
          return;
        }

        // 정상 응답 처리
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
  }, [postId, navigate]);

  // 게시글 삭제
  const deletePost = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/post/${postId}`, {
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

  // 뒤로가기
  const goBack = () => {
    navigate(-1);
  };

  // 게시글 수정 페이지 가기
  const handleEditClick = () => {
    navigate(`/edit/${postId}`, { state: { post: post } });
  };

  return (
    <div className={styles.postInfoBox}>
      <div className={styles.postInfoButtonBox}>
        <button onClick={goBack}>
          <FaArrowLeft />
        </button>
        {status === 'admin' && (
          <div>
            <button onClick={handleEditClick}>Edit</button>
            <button className={styles.delButton} onClick={deletePost}>
              Del
            </button>
          </div>
        )}
      </div>
      <h2 className={styles.postInfoTitle}>{post.title}</h2>
      <p>
        {post.user.name} | {post.createdAt}
      </p>
      <div className={styles.postInfoContent}>
        <CustomReactQuill value={post.content} readOnly={true} />
      </div>
    </div>
  );
}
