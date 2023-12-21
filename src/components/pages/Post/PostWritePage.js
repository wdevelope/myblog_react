import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Styles from './PostWritePage.module.css';
import TextareaAutosize from 'react-textarea-autosize';

export default function PostWritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { subCategoryName } = useParams(); // URL에서 subCategoryName 추출

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title,
          content,
          subCategoryName,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert('게시글 작성에 성공했습니다.');
        navigate(`/${subCategoryName}`);
      } else {
        alert(`작성 실패: ${data.errorMessage}`);
      }
    } catch (error) {
      alert('알 수 없는 에러가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={Styles.postWriteForm}>
        <h2>게시글 작성</h2>
        <label>제목 </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>내용 </label>
        <TextareaAutosize value={content} onChange={(e) => setContent(e.target.value)} minRows={10} />

        <button type="submit">작성</button>
      </form>
    </div>
  );
}
