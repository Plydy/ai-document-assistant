import React, { useEffect, useState } from 'react'
import api from '../api'

export default function History() {
  const [items, setItems] = useState([])

  useEffect(() => {
    api.get('/history')
      .then((r) => {
          console.log(r.data[0])
          setItems(r.data || [])
      })
      .catch(() => setItems([]))
  }, [])

    const parseSummary = (summary) => {
      try{
          return JSON.parse(summary)
      } catch(err) {
          console.error("JSON parse error: ", err)
          return null
      }
    }

    const deleteItem = async (id) => {
      try {
          await api.delete(`/history/${id}`)

          setItems((prev) => prev.filter((item) => item.id !== id))
      } catch(err) {console.error(err)}
    }

    const deleteAll = async () => {
      try {
          await api.delete(`/history`)

          setItems([])
      } catch(err) {console.error(err)}
    }

  return (
      <div
        style={{
            maxWidth: '1100px',
            margin: '40px auto',
            padding: '0 20px',
        }}
      >
      <h3>History</h3>

          <button
              onClick={deleteAll}
              style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  frontWeight: 'bold',
                  marginBottom: '20px'
                }}
              >
              🗑️ Delete History
          </button>
          <div>
              {items.map((it) => {
                  const parsed = parseSummary(it.summary)

                  return (
                      <div
                          key={it.id}
                          style={{
                              border: '1px solid #ccc',
                              padding: '12px',
                              marginBottom: '12px',
                              borderRadius: '8px',
                              position: 'relative'
                          }}
                      >
                          <h3>{it.filename}</h3>

                          <p>
                              {parsed?.summary || "No summary"}
                          </p>

                          <div style={{
                              display: 'flex',
                              gap: '15px',
                              flexWrap: 'wrap',
                              marginTop: '10px',
                          }}>
                              <span>📅 {parsed?.deadlines?.length || 0} deadlines</span>

                              <span>💰 {parsed?.payments?.length || 0} payments</span>

                              <span>📞 {parsed?.contacts?.length || 0} contacts</span>

                              <span>⚠️ {parsed?.notes?.length || 0} notes</span>
                          </div>

                          <button
                              onClick={() => deleteItem(it.id)}
                              style={{
                                  position: 'absolute',
                                  top: '10px',
                                  right: '10px',
                                  border: 'none',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                  fontSize: '18px'
                              }}
                          >
                              ✖
                          </button>

                          <small>
                              {new Date(it.created_at).toLocaleString()}
                          </small>

                      </div>
                  )
              })}
          </div>
      </div>
  )}