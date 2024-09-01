import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './DynaminNav.module.css';
import { BiChevronDown } from 'react-icons/bi';

export default function DynamicNav() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/category`);
        const data = await response.json();
        const sortedCategories = data.sort((a, b) => a.position - b.position);
        setCategories(sortedCategories);

        await fetchSubCategories(sortedCategories);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    const fetchSubCategories = async (categories) => {
      const newSubCategories = {};
      for (let category of categories) {
        const response = await fetch(`/api/subCategory/${category.id}`);
        const data = await response.json();
        newSubCategories[category.id] = data.sort((a, b) => a.position - b.position);
      }
      setSubCategories(newSubCategories);
    };

    fetchCategories();
  }, []);

  return (
    <ul className={styles.categoryList}>
      {categories.map((category) => (
        <li key={category.id} className={styles.categoryItem}>
          <div className={styles.categoryName}>
            {category.name}
            <BiChevronDown />
          </div>
          <ul className={styles.subCategoryList}>
            {subCategories[category.id] &&
              subCategories[category.id].map((subCategory) => (
                <li key={subCategory.id}>
                  <Link to={`/${subCategory.name}`}>{subCategory.name}</Link>
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
