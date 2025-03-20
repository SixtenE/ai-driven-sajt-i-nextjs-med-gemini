"use client";
// import { useState } from "react"

export default function ChatInterface() {
  const handleSubmit = async (e: React.FormEvent) => 
  {
    e.preventDefault();
    const response = await fetch ('/api/generate', {method: 'POST', body: JSON.stringify({ prompt: 'Hello' })});
    const data = await response.json();
    console.log(data.message)


  }
  // const [slectedBot, setSelectedBot] = useState('primary option');

  return (
    <form onSubmit={handleSubmit}>
      {/* <select>
        <option value="Bot1">Bot1</option>
        <option value="Bot2">Bot2</option>
        <option value="Bot3">Bot3</option>
      </select> */}
      <textarea/>

      <button type="submit">Fråga!</button>
    </form>
  )
}