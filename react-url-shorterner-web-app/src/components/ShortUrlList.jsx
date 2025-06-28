import React from "react";

export default function ShortUrlList({ urls }) {
  if (!urls || urls.length === 0) return <p>No shortened URLs yet.</p>;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Shortened URLs</h2>
      {urls.map((url, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          <p>
            <strong>Long URL:</strong>{" "}
            <a href={url.longUrl} target="_blank" rel="noopener noreferrer">
              {url.longUrl}
            </a>
          </p>
          <p>
            <strong>Short URL:</strong>{" "}
            <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
              {url.shortUrl}
            </a>
          </p>
          <p>
            <strong>Expiry:</strong> {new Date(url.expiry).toLocaleString()}
          </p>
          <p>
            <strong>Clicks:</strong> {url.clicks}
          </p>
          <ul>
            {url.clickData &&
              url.clickData.map((click, i) => (
                <li key={i}>
                  {new Date(click.timestamp).toLocaleString()} -{" "}
                  {click.source} - {click.location}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
