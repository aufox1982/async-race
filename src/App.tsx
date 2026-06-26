import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '@/shared/components/Navigation';
import GaragePage from '@/features/garage/GaragePage';
import WinnersPage from '@/features/winners/WinnersPage';

/**
 * Root component.
 * Two routes: /garage and /winners.
 * Anything else redirects to /garage.
 */
function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route path="/garage" element={<GaragePage />} />
          <Route path="/winners" element={<WinnersPage />} />
          <Route path="*" element={<Navigate to="/garage" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
