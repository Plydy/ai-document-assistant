import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Nav({
    theme,
    themeName,
    setThemeName,})
{
  const nav = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    nav('/login')
  }

  function toggleTheme() {
      setThemeName(
          themeName === 'dark'
          ? 'light'
              : 'dark'
      )
  }

  return (
    <nav
    style={{
        backgroundColor: theme.card,
        borderBottom: `1px solid ${theme.border}`,
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }}
    >
      <div
      style={{
          color: theme.accent,
          fontWeight: 'bold',
          fontSize: '20px'
      }}
      >
          AI Doc Assistant
      </div>

      <div
          style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
          }}
      >
        <NavLink
            to="/"
            style={{
                color: theme.text,
                textDecoration: 'none'
            }}
        >
            Upload
        </NavLink>
        <NavLink
            to="/history"
            style={{
                color: theme.text,
                textDecoration: 'none'
            }}
        >
            History
        </NavLink>

        <button
            onClick={toggleTheme}
            style={{
                border: 'none',
                background: theme.accent,
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer'
            }}
            >
            {themeName ==='dark' ? '☀️' : '🌙'}
        </button>

        <button
        onClick={logout}
        style={{
            border: 'none',
            background: 'transparent',
            color: theme.text,
            cursor: 'pointer'
        }}
        >
            Logout
        </button>
      </div>
    </nav>
  )
}
