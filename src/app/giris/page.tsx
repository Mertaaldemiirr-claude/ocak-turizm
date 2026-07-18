"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GirisPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #041A3D 0%, #0a2d5c 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "48px 40px",
          maxWidth: "400px",
          width: "90%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#041A3D",
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          Ocak Turizm
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: "14px",
            marginBottom: "32px",
          }}
        >
          Site yapim asamasindadir. Erisim icin parola gereklidir.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parola"
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "16px",
              border: error ? "2px solid #e74c3c" : "2px solid #e0e0e0",
              borderRadius: "8px",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: "8px",
            }}
            autoFocus
          />
          {error && (
            <p style={{ color: "#e74c3c", fontSize: "13px", margin: "0 0 12px" }}>
              Yanlis parola. Tekrar deneyin.
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              fontWeight: 600,
              color: "white",
              background: loading ? "#999" : "#C9A84C",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "8px",
            }}
          >
            {loading ? "Kontrol ediliyor..." : "Giris Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
