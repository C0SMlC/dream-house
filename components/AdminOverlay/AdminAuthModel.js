// components/AdminAuthModal.js
"use client";

import { useState } from "react";

export default function AdminAuthModal() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        window.location.reload();
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.overlay} className="text-black">
      <div style={styles.modal}>
        <h2>Admin Authentication</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Verifying..." : "Submit"}
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(5px)",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    minWidth: "300px",
  },
  input: {
    padding: "0.5rem",
    width: "100%",
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "1rem",
  },
};
