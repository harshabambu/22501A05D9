import React from 'react';

export default function Stats({ urls }) {
  if (urls.length === 0) return <p>No URLs created yet.</p>;

  return (
    <div>
      {urls.map((url) => (
        <div key={url.shortCode} className="short-url">
          <div>
            <strong>
              <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                {url.shortUrl}
              </a>
            </strong>
          </div>
          <div>Original: {url.longUrl}</div>
          <div>
            Expires at: {new Date(url.expiresAt).toLocaleString()}
          </div>
          <div>Total Clicks: {url.clicks}</div>
          {url.clickDetails && url.clickDetails.length > 0 && (
            <ul>
              {url.clickDetails.map((click, idx) => (
                <li key={idx}>
                  {new Date(click.time).toLocaleString()} - {click.source}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
