/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  display: flex;
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
  max-width: 50%;
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
  border: 1px solid #ccc;
  border-radius: 8px 0 0 8px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: semi-bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const Output = styled.p`
  margin-top: 20px;
  font-size: 20px;
  color: #007bff;
  word-wrap: break-word;
  animation: fadeIn 0.3s ease;
`;

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [click, setClick] = useState(false);

  const copyToClipboard = async () => {
    setClick(true);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
    setTimeout(() => setClick(false), 1000);
  };

  const shortenUrl = async () => {
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
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
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
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={shortenUrl} style={{borderRadius: '0 8px 8px 0'}}>Shorten</Button>
        </div>

        {shortUrl && (
          <>
            <Output>{shortUrl}</Output>
            <Button onClick={copyToClipboard} style={{ padding: "10px 30px" }}>
              {click? "Copied" : "Copy"}
            </Button>
          </>
        )}
      </Box>
    </AppContainer>
  );
}
