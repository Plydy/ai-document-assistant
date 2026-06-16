import React from 'react'
import { useState } from 'react'
import { themes } from "./theme";
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function RequireAuth({ children }) {
  const token = localStorage.getItem('token')

  return token && token !== 'undefined'
    ? children
      :<Navigate to="/login" replace/>
}

export default function App() {
    const [themeName, setThemeName] = useState('dark')
    const theme = themes[themeName]
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
    </Routes>
  )
}
