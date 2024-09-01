import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchComponent.module.css';

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      navigate(-1);
    } else {
      // 검색어가 있으면 검색 결과 페이지로 이동
      navigate(`/search?page=1&keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <select className={styles.searchSelect}>
        <option value="all">제목+내용</option>
      </select>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="검색어 입력"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}
