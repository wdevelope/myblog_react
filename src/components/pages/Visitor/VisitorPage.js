'use client';

import React from 'react';
import styles from './visitor.module.css';

export default function VisitorPage() {
  return (
    <div className={styles.visitorDiv}>
      <h2>Visitor</h2>
      <table className={styles.visitorTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
