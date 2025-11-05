/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(145deg, #007bff, #00c6ff, yellow);
  font-family: "Segoe UI", sans-serif;
`;

const Box = styled.div`
  background-color: white;
  padding: 60px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 500px;
  max-width: 90%;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Input = styled.input`
  width: 75%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ isError }) => (isError ? "red" : "#ccc")};
  border-radius: 8px 0 0 8px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ isError }) => (isError ? "red" : "#007bff")};
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Output = styled.p`
  margin-top: 20px;
  font-size: 20px;
  color: #007bff;
  word-wrap: break-word;
  animation: fadeIn 0.3s ease;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  animation: fadeIn 0.2s ease;
`;

const FooterText = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: white;
  opacity: 0.8;
`;

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shortenUrl = async () => {
    if (!url.trim()) {
      setError("Oops! You forgot to enter a URL");
      setShortUrl("");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch("https://api.ogli.sh/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer lnk_8163bb55cb527f4d41f24c9991d1c7ce1838a7098f5997cbd032e288730be151",
        },
        body: JSON.stringify({
          targetUrl: url,
          useOriginalMeta: true,
        }),
      });
      const data = await response.json();
      if (data.url) {
        setShortUrl(data.url);
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <Box>
        <h1 style={{ marginBottom: "20px" }}>🔗 URL Shortener</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Input
            type="text"
            placeholder="Enter your long URL"
            value={url}
            isError={!!error}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={shortenUrl} disabled={loading}>
            {loading ? "Shortening..." : "Shorten"}
          </Button>
        </div>

        {error && <ErrorText>{error}</ErrorText>}
        {shortUrl && !error && (
          <>
            <Output>{shortUrl}</Output>
            <Button
              onClick={copyToClipboard}
              disabled={copied}
              style={{
                padding: "10px 30px",
                borderRadius: "8px",
                backgroundColor: copied ? "#007bff" : "#007bff",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </>
        )}
      </Box>

      <FooterText>
        Reference API by <a href="https://ogli.sh" target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "underline" }}>ogli.sh</a>
      </FooterText>
    </AppContainer>
  );
}
