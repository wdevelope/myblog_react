import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import styles from './VisitorInfoPage.module.css';
import CustomReactQuill from '../../common/CustomReactQuill';

export default function VisitorInfoPage() {
  const [visitor, setVisitor] = useState({
    title: '',
    content: '',
    user: { name: '' },
    createdAt: '',
    visitorComments: [],
  });
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const password = location.state?.password || '';

  useEffect(() => {
    const fetchVisitorDetails = async () => {
      const visitorId = params.id;
      try {
        const response = await fetch(`/api/visitor/${visitorId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        });

        if (!response.ok) {
          throw new Error('방명록 상세페이지 렌더링 에러');
        }

        const data = await response.json();
        setVisitor({
          ...data,
          createdAt: new Date(data.createdAt).toLocaleDateString(),
        });
      } catch (error) {
        console.error('Error fetching visitor detail', error);
      }
    };

    fetchVisitorDetails();
  }, [params.id, password]);

  const goBack = () => {
    navigate(-1);
  };

  const deleteVisitor = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/visitor/${params.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();

        if (response.status === 200) {
          alert('방명록이 삭제되었습니다.');
          navigate(-1);
        } else {
          alert(`삭제 실패: ${data.errorMessage}`);
        }
      } catch (error) {
        console.error('방명록 삭제 서버에러', error);
        alert('방명록 삭제에 실패했습니다.');
      }
    }
  };

  const putVisitor = () => {
    alert('방명록 수정기능은 준비중입니다.');
  };

  return (
    <div className={styles.visitorInfoBox}>
      <div className={styles.visitorInfoButtonBox}>
        <button onClick={goBack}>
          <FaArrowLeft />
        </button>
        <div>
          <button onClick={putVisitor}>Edit</button>
          <button className={styles.delButton} onClick={deleteVisitor}>
            Del
          </button>
        </div>
      </div>

      <h2 className={styles.visitorInfoTitle}>{visitor.title}</h2>
      <p>
        {visitor.user.name}&nbsp;
        <FaUser />
        &nbsp; &nbsp;| &nbsp;{visitor.createdAt}
      </p>

      <div className={styles.visitorInfoContent}>
        <CustomReactQuill value={visitor.content} readOnly={true} />
      </div>
      <div className={styles.visitorInfoComment}>
        <h3>댓글</h3>
        {visitor.visitorComments &&
          visitor.visitorComments.map((comment, index) => (
            <div key={index} className={styles.visitorComment}>
              <span>{comment.name}</span>
              <p>{comment.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
