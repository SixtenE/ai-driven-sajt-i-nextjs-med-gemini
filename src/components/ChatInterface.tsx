"use client";
import { useState } from "react"

export default function ChatInterface() {
  const [slectedBot, setSelectedBot] = useState('primary option');

  return (
    <>
      <select>
        <option value="Bot1">Bot1</option>
        <option value="Bot2">Bot2</option>
        <option value="Bot3">Bot3</option>
      </select>

      <input type="text" />
    </>
  )
}