import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy-loaded pages — each gets its own JS chunk (faster initial load)
const Home        = lazy(() => import('./pages/Home'));
const Poetry      = lazy(() => import('./pages/Poetry'));
const PoemsEn     = lazy(() => import('./pages/PoemsEn'));
const Translations= lazy(() => import('./pages/Translations'));
const Reviews     = lazy(() => import('./pages/Reviews'));
const Prose       = lazy(() => import('./pages/Prose'));
const Admin       = lazy(() => import('./pages/Admin'));
const Login       = lazy(() => import('./pages/Login'));
const NotFound    = lazy(() => import('./pages/NotFound'));

// Minimal loading spinner shown while chunks load
const PageLoader = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '2px solid rgba(201,169,110,0.2)',
      borderTopColor: '#c9a96e',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
  </div>
);

function App() {
  return (
    <ContentProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="poetry" element={<Poetry />} />
              <Route path="poems-en" element={<PoemsEn />} />
              <Route path="translations" element={<Translations />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="prose" element={<Prose />} />
              <Route path="login" element={<Login />} />
              <Route
                path="admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ContentProvider>
  );
}

export default App;
