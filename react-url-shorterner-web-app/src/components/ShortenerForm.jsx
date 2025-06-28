import React, { useState } from "react";

export default function ShortenerForm({ onShorten }) {
  const [urlInputs, setUrlInputs] = useState([
    { longUrl: "", validity: "", customCode: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...urlInputs];
    updated[index][field] = value;
    setUrlInputs(updated);
  };

  const handleAddInput = () => {
    if (urlInputs.length >= 5) return;
    setUrlInputs([...urlInputs, { longUrl: "", validity: "", customCode: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onShorten(urlInputs);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
      {urlInputs.map((input, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          <h4>URL {idx + 1}</h4>
          <input
            type="text"
            placeholder="Long URL"
            value={input.longUrl}
            onChange={(e) => handleChange(idx, "longUrl", e.target.value)}
            required
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <input
            type="number"
            placeholder="Validity in minutes (optional)"
            value={input.validity}
            onChange={(e) => handleChange(idx, "validity", e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <input
            type="text"
            placeholder="Custom shortcode (optional)"
            value={input.customCode}
            onChange={(e) => handleChange(idx, "customCode", e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
        </div>
      ))}

      {urlInputs.length < 5 && (
        <button
          type="button"
          onClick={handleAddInput}
          style={{
            backgroundColor: "#43a047",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            marginBottom: "1rem",
            cursor: "pointer",
          }}
        >
          + Add URL
        </button>
      )}

      <br />
      <button
        type="submit"
        style={{
          backgroundColor: "#43a047",
          color: "white",
          border: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Shorten URLs
      </button>
    </form>
  );
}
