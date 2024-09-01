import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Snow 테마 스타일

const CustomReactQuill = ({ value, onChange, readOnly = false }) => {
  // Quill 모듈 설정
  const modules = {
    toolbar: readOnly
      ? false
      : [
          [{ header: [1, 2, 3, false] }], // 헤더 크기
          ['bold', 'italic', 'underline', 'strike'], // 표준 텍스트 포맷팅
          ['blockquote', 'code-block'], // 블록 인용문 및 코드 블록

          [{ list: 'ordered' }, { list: 'bullet' }], // 리스트
          [{ indent: '-1' }, { indent: '+1' }], // 들여쓰기

          [{ color: [] }, { background: [] }], // 글자 색상 및 배경색
          [{ align: [] }], // 정렬

          ['clean'], // 포매팅 제거
        ],
    clipboard: {
      matchVisual: true,
    },
  };

  return <ReactQuill value={value} onChange={onChange} modules={modules} theme="snow" readOnly={readOnly} />;
};

export default CustomReactQuill;
