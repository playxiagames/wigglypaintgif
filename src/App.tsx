import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LanguageRouter from './components/routing/LanguageRouter';
import LanguageRedirect from './components/routing/LanguageRedirect';
// import LanguageSuggestionBanner from './components/common/LanguageSuggestionBanner';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Stats from './pages/Stats';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import { initializeGA } from './utils/analytics';

function App() {
  useEffect(() => {
    // 初始化 Google Analytics (替换为你的 GA Measurement ID)
    // 如果没有GA ID，这个调用会被忽略
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (GA_MEASUREMENT_ID) {
      initializeGA(GA_MEASUREMENT_ID);
    }
  }, []);

  return (
    <Router>
      <LanguageRedirect>
        <Routes>
          {/* 所有路由统一处理 - 支持可选语言参数 */}
          <Route path="/:lang?" element={
            <Layout>
              <LanguageRouter>
                <Outlet />
              </LanguageRouter>
            </Layout>
          }>
            <Route index element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="about" element={<About />} />
            <Route path="stats" element={<Stats />} />
            <Route path="contact" element={<Contact />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="blog" element={<Blog />} />
          </Route>
          
          {/* 英语显式路径重定向到根路径 */}
          <Route path="/en" element={<Navigate to="/" replace />} />
          <Route path="/en/*" element={<Navigate to="/" replace />} />
          
          {/* 404 处理 - 重定向到首页 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LanguageRedirect>
    </Router>
  );
}

export default App;