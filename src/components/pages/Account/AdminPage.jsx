import React, { useState } from 'react';

export default function AdminPage() {
  const [categoryForm, setCategoryForm] = useState({ name: '', position: 1 });
  const [subCategoryForm, setSubCategoryForm] = useState({ categoryName: '', name: '', position: 1 });
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (e) => {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  };

  const handleSubCategoryChange = (e) => {
    setSubCategoryForm({ ...subCategoryForm, [e.target.name]: e.target.value });
  };

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/category`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryForm),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert('카테고리가 생성되었습니다.');
      setCategories([...categories, data]);
    } catch (error) {
      alert('카테고리 생성 실패');
      console.error('카테고리 생성 실패', error);
    }
  };

  const createSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/subCategory`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subCategoryForm),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('서브카테고리가 생성되었습니다.');
    } catch (error) {
      alert('서브카테고리 생성 실패');
      console.error('서브카테고리 생성 실패', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`/api/category/${categoryId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('카테고리가 삭제되었습니다.');
      setCategories(categories.filter((category) => category.id !== categoryId));
    } catch (error) {
      alert('카테고리 삭제 실패');
      console.error('카테고리 삭제 실패', error);
    }
  };

  return (
    <div className="admin-box">
      <div className="adminTitle">
        <h2>관리자 페이지</h2>
      </div>
      {/* 카테고리 생성 폼 */}
      <div className="adminTitle">
        <h3>카테고리 생성</h3>
      </div>
      <form onSubmit={createCategory}>
        <label>
          카테고리 이름:
          <input type="text" name="name" value={categoryForm.name} onChange={handleCategoryChange} />
        </label>
        <label>
          카테고리 위치:
          <input type="number" name="position" value={categoryForm.position} min="1" onChange={handleCategoryChange} />
        </label>
        <button type="submit">카테고리 생성</button>
      </form>
      <br />
      {/* 서브카테고리 생성 폼 */}
      <div className="adminTitle">
        <h3>서브 카테고리 생성</h3>
      </div>
      <form onSubmit={createSubCategory}>
        <label>
          카테고리 이름:
          <input
            type="text"
            name="categoryName"
            value={subCategoryForm.categoryName}
            onChange={handleSubCategoryChange}
          />
        </label>
        <label>
          서브카테고리 이름:
          <input type="text" name="name" value={subCategoryForm.name} onChange={handleSubCategoryChange} />
        </label>
        <label>
          서브카테고리 위치:
          <input
            type="number"
            name="position"
            value={subCategoryForm.position}
            min="1"
            onChange={handleSubCategoryChange}
          />
        </label>
        <button type="submit">서브카테고리 생성</button>
      </form>
      <br />
      {/* 생성된 카테고리 목록 */}
      <div>
        <h3>생성된 카테고리</h3>
        {categories.map((category) => (
          <div key={category.id}>
            {category.name} - 위치: {category.position}
            <button onClick={() => deleteCategory(category.id)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}
