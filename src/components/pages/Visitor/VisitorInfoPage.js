import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import styles from './VisitorInfoPage.module.css';

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

  useEffect(() => {
    const fetchVisitorDetails = async () => {
      const visitorId = params.id;
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/visitor/${visitorId}`);
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
  }, [params.id]);

  const goBack = () => {
    navigate(-1);
  };

  const deleteVisitor = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/api/visitor/${params.visitorId}`, {
          method: 'DELETE',
        });
        alert('방명록이 삭제되었습니다.');
        navigate(-1);
      } catch (error) {
        console.error('방명록 삭제 서버에러', error);
        alert('방명록 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className={styles.visitorInfoBox}>
      <div className={styles.visitorInfoButtonBox}>
        <button onClick={goBack}>
          <FaArrowLeft />
        </button>
        <button onClick={deleteVisitor}>Delete</button>
      </div>

      <h1 className={styles.visitorInfoTitle}>{visitor.title}</h1>
      <p>
        {visitor.user.name}&nbsp;
        <FaUser />
        &nbsp; &nbsp;| &nbsp;{visitor.createdAt}
      </p>
      <div className={styles.visitorInfoContent}>{visitor.content}</div>

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
