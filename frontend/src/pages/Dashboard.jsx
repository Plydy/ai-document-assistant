import React from 'react'
import { useState } from "react";
import { themes } from "../theme";
import { Routes, Route } from 'react-router-dom'
import Nav from '../components/Nav'
import Upload from './Upload'
import Analyze from './Analyze'
import History from './History'

export default function Dashboard() {
    const [themeName, setThemeName] = useState('dark')
    const theme = themes[themeName]
  return (
    <div
    style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: '100vh'
    }}
    >
      <Nav
      theme={theme}
      themeName={themeName}
      setThemeName={setThemeName}
      />
      <main className="container">
        <Routes>
          <Route path="*" element={<Upload theme={theme} />} />
          <Route path="/" element={<Upload theme={theme} />} />
          <Route path="history" element={<History theme={theme} />} />
        </Routes>
      </main>
    </div>
  )
}
