import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import ShortenerForm from './components/ShortenerForm';
import Statistics from './components/Statistics';

export default function App() {
  const [urls, setUrls] = useState(() => {
    const saved = localStorage.getItem('shortUrls');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shortUrls', JSON.stringify(urls));
  }, [urls]);

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <nav>
        <Link to="/">Shorten</Link> | <Link to="/Statistics">Statistics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ShortenerForm urls={urls} setUrls={setUrls} />} />
        <Route path="/Statistics" element={<Statistics urls={urls} />} />
        <Route path="/:code" element={<RedirectHandler urls={urls} setUrls={setUrls} />} />
      </Routes>
    </div>
  );
}

function RedirectHandler({ urls, setUrls }) {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urlEntry = urls.find((u) => u.shortCode === code);
    if (urlEntry) {
      const updatedUrls = urls.map((u) =>
        u.shortCode === code
          ? {
              ...u,
              clicks: (u.clicks || 0) + 1,
              clickDetails: [
                ...(u.clickDetails || []),
                {
                  time: new Date().toISOString(),
                  source: document.referrer || 'Direct',
                },
              ],
            }
          : u
      );
      setUrls(updatedUrls);
      localStorage.setItem('shortUrls', JSON.stringify(updatedUrls));
      window.location.href = urlEntry.longUrl;
    } else {
      alert('Invalid or expired link.');
      navigate('/');
    }
  }, [code]);

  return <p>Redirecting...</p>;
}
