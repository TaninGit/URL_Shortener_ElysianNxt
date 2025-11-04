import './App.css'
import { useState } from "react"
import CopyButton from "./components/CopyButton"
function  App() {

  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")

  const shortenUrl = async () => {
    try {
      const response = await fetch('https://api.ogli.sh/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer lnk_8163bb55cb527f4d41f24c9991d1c7ce1838a7098f5997cbd032e288730be151'
        },  
        body: JSON.stringify({ 
          targetUrl: url,
          useOriginalMeta : true

        })
      })
      const newShortUrl = await response.json()
      if(newShortUrl.url) {
        setShortUrl(newShortUrl.url)
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    }catch (error) {
      console.error("Error shortening URL:", error)
    }
    console.log("URL to shorten:", url)
    console.log("Shortened URL:", shortUrl)
  }

  return (
    <>
      <h1 style={{color:"blue", border:"1px solid black"}}>Welcome to my-app</h1>
      <input 
        type="text" 
        placeholder="Enter your long URL" 
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={shortenUrl}>Shorten</button>
      <h1>{shortUrl}</h1>
      <CopyButton text={shortUrl} />
    </>
  )
}

export default App