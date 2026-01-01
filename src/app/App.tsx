import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './Layout';
import { HomePage } from '../pages/HomePage';
import { WorkPage } from '../pages/WorkPage';
import { ProjectPage } from '../pages/ProjectPage';
import { WritingPage } from '../pages/WritingPage';
import { ArticlePage } from '../pages/ArticlePage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="work/:slug" element={<ProjectPage />} />
        <Route path="writing" element={<WritingPage />} />
        <Route path="writing/:slug" element={<ArticlePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
