import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Poetry from './pages/Poetry';
import PoemsEn from './pages/PoemsEn';
import Translations from './pages/Translations';
import Reviews from './pages/Reviews';
import Prose from './pages/Prose';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ContentProvider>
      <Router>
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
          </Route>
        </Routes>
      </Router>
    </ContentProvider>
  );
}

export default App;
