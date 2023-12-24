import React, { useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './PostEditPage.module.css';

export default function PostEditPage() {
  const location = useLocation();
  const { postId } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const initialPost = location.state?.post || { title: '', content: '' };
  const [post, setPost] = useState(initialPost);

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/post/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: post.title,
          content: post.content,
        }),
      });

      if (response.ok) {
        alert('게시글이 수정되었습니다.');
        navigate(-1); // 수정 후 이전 페이지로 이동
      } else {
        const data = await response.json();
        alert(`수정 실패: ${data.errorMessage}`);
      }
    } catch (error) {
      console.error('Error updating post', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  // 뒤로가기
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.postEditBox}>
      <h2>게시글 수정</h2>
      <button onClick={goBack}>
        <FaArrowLeft />
      </button>
      <input type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
      <ReactQuill ref={quillRef} value={post.content} onChange={(content) => setPost({ ...post, content })} />

      <button onClick={handleEditSubmit}>Submit</button>
    </div>
  );
}
