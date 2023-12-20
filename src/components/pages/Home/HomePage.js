import styles from './HomePage.module.css';
import { FaPencilAlt, FaDiscord, FaRocket, FaUser, FaAngleDoubleUp, FaBrain } from 'react-icons/fa';

export default function Home() {
  return (
    <main className={styles.homeMain}>
      <h2>
        <FaRocket />
        w-life 블로그에 오신 것을 환영합니다.
      </h2>
      <br />
      <p>본 블로그는 2023년부터 개인적인 일기, 개발일지 등 글쓰기 공간으로 사용할 예정입니다.</p>
      <br />
      <h3>
        <FaPencilAlt />
        study
      </h3>
      <ul>
        <li>
          <strong>web:</strong> 웹개발 학습 정리 자료입니다.
        </li>
        <li>
          <strong>server:</strong> 서버 학습 정리 자료입니다.
        </li>
        <li>
          <strong>ioT:</strong> 사물인터넷 학습 정리 자료입니다.
        </li>
      </ul>
      <br />
      <h3>
        <FaDiscord /> hobby
      </h3>
      <ul>
        <li>
          <strong>헬스 :</strong> 헬스 일기입니다.
        </li>
      </ul>
      <br />
      <h3>
        <FaBrain />
        Life
      </h3>
      <ul>
        <li>
          <strong>2023 :</strong> 소소한 일기입니다.
        </li>
      </ul>
      <br />
      <h3>
        <FaAngleDoubleUp />
        version
      </h3>
      <ul>
        <li>블로그 개선 버전관리입니다.</li>
      </ul>
      <br />
      <h3>
        <FaUser />
        Visitors
      </h3>
      <span>자유로운 방명록 게시판입니다.</span>
    </main>
  );
}
