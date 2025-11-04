import React from 'react'
import { useState } from 'react'

function CopyButton({text}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  return (
    <button onClick={copyToClipboard}>Click</button>
  )
}

export default CopyButton