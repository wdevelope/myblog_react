import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import BasicHeader from './components/common/BasicHeader';
import BasicNav from './components/common/BasicNav';
import HomePage from './components/pages/Home/HomePage';
import LoginPage from './components/pages/Login/LoginPage';
import RegisterPage from './components/pages/Register/RegisterPage';
import VisitorPage from './components/pages/Visitor/VisitorPage';
import VisitorWritePage from './components/pages/Visitor/VisitorWritePage';
import VisitorInfoPage from './components/pages/Visitor/VisitorInfoPage';
import PostPage from './components/pages/Post/PostPage';
import PostInfoPage from './components/pages/Post/PostInfoPage';
import PostWritePage from './components/pages/Post/PostWritePage';
import PostEditPage from './components/pages/Post/PostEditPage';
import AccountPage from './components/pages/Account/AccountPage';
import AdminPage from './components/pages/Account/AdminPage';
// redux
import { UserProvider } from './store/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <header>
            <BasicHeader />
          </header>
          <nav>
            <BasicNav />
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate replace to="/" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/visitor" element={<VisitorPage />} />
              <Route path="/visitor/write" element={<VisitorWritePage />} />
              <Route path="/visitor/:id" element={<VisitorInfoPage />} />
              <Route path="/:subCategoryName" element={<PostPage />} />
              <Route path="/:subCategoryName/post/:postId" element={<PostInfoPage />} />
              <Route path="/:subCategoryName/post/write" element={<PostWritePage />} />
              <Route path="/edit/:postId" element={<PostEditPage />} />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
