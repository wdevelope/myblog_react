import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './VisitorWritePage.module.css';
import CustomReactQuill from '../../common/CustomReactQuill';

export default function VisitorWritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/visitor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title,
          content,
          isPrivate,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert('방명록 작성에 성공했습니다.');
        navigate('/visitor');
      } else {
        alert(`로그인에 실패했습니다: ${data.errorMessage}`);
      }
    } catch (error) {
      alert('알 수 없는 에러가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={Styles.visitorWriteForm}>
        <h2>방명록 글쓰기</h2>
        <label>제목 </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>내용 </label>
        <CustomReactQuill className={Styles.contentInput} value={content} onChange={setContent} />
        <label>비밀글 </label>
        <input
          type="checkbox"
          className={Styles.checkBox}
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        <label>비밀번호</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!isPrivate} />
        <button className={Styles.visitorWriteButton} type="submit">
          작성
        </button>
      </form>
    </div>
  );
}
