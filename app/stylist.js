"use client";

import { useState } from "react";

export default function Stylist() {
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function chooseImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setResult("");
      setError("");
    };
    reader.readAsDataURL(file);
  }

  async function recommendLook() {
    setLoading(true);
    setResult("");
    setError("");

    try {
      const response = await fetch("/api/style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);
      setResult(data.recommendation);
    } catch (requestError) {
      setError(requestError.message || "잠시 후 다시 시도해줘.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="stylist-box">
      <span>AI STYLIST</span>
      <h2>네 사진 한 장으로<br />코디 시작하기</h2>
      <p>가지고 있는 옷을 올리면 MOOD ODD 무드로 코디를 만들어줄게.</p>

      {image && <img className="stylist-preview" src={image} alt="선택한 옷" />}

      <div className="stylist-actions">
        <label className="upload-button">
          {image ? "다른 사진 고르기" : "사진 고르기"}
          <input type="file" accept="image/*" onChange={chooseImage} />
        </label>
        {image && (
          <button
            className="recommend-button"
            type="button"
            onClick={recommendLook}
            disabled={loading}
          >
            {loading ? "코디 만드는 중..." : "코디 추천받기"}
          </button>
        )}
      </div>

      {result && <div className="stylist-result">{result}</div>}
      {error && <p className="stylist-error">{error}</p>}
    </section>
  );
}
