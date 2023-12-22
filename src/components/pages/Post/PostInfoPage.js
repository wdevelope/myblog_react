import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './PostInfoPage.module.css';
import { useUserContext } from '../../../store/UserContext';

export default function PostInfoPage() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    user: { name: '' },
    createdAt: '',
  });
  const { postId } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const { userInfo } = useUserContext();
  const { status } = userInfo;

  const quillRef = useRef(null);

  // 게시글 렌더링
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

  // 게시글 수정 모드 활성화
  const handleEdit = () => {
    setEditMode(true);
    setEditedTitle(post.title);
    setEditedContent(post.content);

    // ReactQuill에 기존 콘텐츠를 HTML 형식으로 로드
    if (quillRef.current) {
      quillRef.current.getEditor().clipboard.dangerouslyPasteHTML(post.content);
    }
  };
  // 게시글 수정 요청
  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/post/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent,
        }),
      });

      if (response.ok) {
        alert('게시글이 수정되었습니다.');
        navigate(-1);
      } else {
        const data = await response.json();
        alert(`수정 실패: ${data.errorMessage}`);
      }
    } catch (error) {
      console.error('게시글 수정 서버 에러', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  // 게시글 삭제
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
        {status === 'admin' && (
          <div>
            {!editMode && <button onClick={handleEdit}>Put</button>}
            {editMode && (
              <>
                <button onClick={handleEditSubmit}>Submit</button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
              </>
            )}
            <button onClick={deletePost}>Delete</button>
          </div>
        )}
      </div>
      <h2 className={styles.postInfoTitle}>{post.title}</h2>
      <p>
        {post.user.name} | {post.createdAt}
      </p>
      {/* 내용 편집 */}
      <div className={styles.postInfoContent}>
        {editMode ? (
          <ReactQuill ref={quillRef} value={editedContent} onChange={setEditedContent} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
      </div>
    </div>
  );
}
