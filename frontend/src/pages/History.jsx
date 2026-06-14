import React, { useEffect, useState } from 'react'
import api from '../api'

export default function History() {
  const [items, setItems] = useState([])

  useEffect(() => {
    api.get('/history')
      .then((r) => setItems(r.data || []))
      .catch(() => setItems([]))
  }, [])

  return (
      <div>
      <h3>History</h3>
          <div>
              {items.map((it) => (
                  <div
                      key={it.id}
                      style={{
                          border: '1px solid #ccc',
                          padding: '12px',
                          marginBottom: '12px',
                          borderRadius: '8px',
                      }}
                  >
                      <h4>{it.filename}</h4>

                      <small>
                          {new Date(it.created_at).toLocaleString()}
                      </small>

                      <p style={{ marginTop: '10px' }}>
                          {it.summary}
                      </p>
                    </div>
                  ))}
          </div>
      </div>
  )}