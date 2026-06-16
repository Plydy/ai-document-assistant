import React, {useState} from 'react'
import api from '../api'

export default function Upload({theme}) {
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState('')
    const [summary, setSummary] = useState('')
    const [loading, setLoading] = useState(false)

    async function submit(e) {
        e.preventDefault()

        setLoading(true)
        if (!file) return setMessage('Select a file')
        const fd = new FormData()
        fd.append('file', file)
        try {
            const res = await api.post('/upload', fd, {
                headers: {'Content-Type': 'multipart/form-data'},
            })
            setMessage('✅ Analysis completed successfully')
            setSummary(res.data.summary || 'No analysis returned')
            setLoading(false)
        } catch (err) {
            setMessage('Upload failed: ' + (err.response?.data || err.message))
            setLoading(false)
        }
    }

    return (
        <div
            style={{
                maxWidth: '900px',
                margin: '40px auto'
            }}
        >

            <div
                style={{
                    backgroundColor: theme.card,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '16px',
                    padding: '30px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                }}
            >

                <h2
                    style={{
                        marginTop: 0,
                        color: theme.text
                    }}
                >
                    Upload Document
                </h2>

                <p
                    style={{
                        color: theme.secondaryText,
                        marginBottom: '25px'
                    }}
                >
                    Upload PDF, DOCX, JPG or PNG files for OCR and AI analysis.
                </p>

                <form onSubmit={submit}>
                    <input type="file"
                           onChange={(e) => setFile(e.target.files[0])}
                    />
                    {file && (
                        <p
                            style={{
                                color: theme.secondaryText,
                                marginTop: '10px',
                            }}
                        >
                            📄 Selected: {file.name}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: theme.accent,
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            marginTop: '15px'
                        }}
                    >
                        {loading ? 'Analyzing...' : 'Upload...'}
                    </button>

                </form>

                {loading && (
                    <div
                        style={{
                            marginTop: '20px',
                            textAlign: 'center'
                        }}
                    >
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                border: '4px solid #374151',
                                borderTop: `4px solid ${theme.accent}`,
                                borderRadius: '50%',
                                margin: '0 auto'
                            }}
                            className="spinner"
                        />

                        <p style={{marginTop: '10px'}}>
                            OCR and AI analysis in progress...
                        </p>
                    </div>
                )}
                {message && (
                    <div
                        style={{
                            marginTop: '20px',
                            padding: '12px',
                            borderRadius: '8px',
                            backgroundColor: theme.background,
                            color: theme.text
                        }}
                    >
                        {message}
                    </div>
                )}
                {summary && (
                    <div
                        style={{
                            padding: '20px',
                            border: `1px solid ${theme.border}`,
                            borderRadius: '12px',
                            backgroundColor: theme.background,
                            color: theme.text,
                            marginBottom: '15px'
                        }}
                    >
                        <h3>AI Summary</h3>
                        <p>{summary.summary}</p>
                    </div>
                )}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '20px',
                        marginTop: '20px'
                    }}
                   >

                    {summary.deadlines?.length > 0 && (
                        <div
                            style={{
                                padding: '20px',
                                borderLeft: '4px solid #3b82f6',
                                borderTop: `1px solid ${theme.border}`,
                                borderRight: `1px solid ${theme.border}`,
                                borderBottom: `1px solid ${theme.border}`,
                                borderRadius: '12px',
                                backgroundColor: theme.background,
                                color: theme.text,
                                marginBottom: '15px',
                                minHeight: '260px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <h3>📅 Deadlines</h3>

                            {summary.deadlines.map((item, index) => (
                                <p key={index}
                                style={{
                                    margin: '6px 0'
                                }}
                                >
                                    • {item}
                                </p>
                            ))}
                        </div>
                    )}
                    {summary.payments?.length > 0 && (
                        <div
                            style={{
                                padding: '20px',
                                borderLeft: '4px solid #22c55e',
                                borderTop: `1px solid ${theme.border}`,
                                borderRight: `1px solid ${theme.border}`,
                                borderBottom: `1px solid ${theme.border}`,
                                borderRadius: '12px',
                                backgroundColor: theme.background,
                                color: theme.text,
                                marginBottom: '15px',
                                minHeight: '260px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <h3>💰 Payments</h3>

                            {summary.payments.map((payment, index) => (
                                <div key={index}>
                                    <p>
                                        Allocated: ${payment.budget_allocated}
                                    </p>

                                    <p>
                                        Remaining: ${payment.remaining_budget}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {summary.contacts?.length > 0 && (
                        <div
                            style={{
                                padding: '20px',
                                borderLeft: '4px solid #a855f7',
                                borderTop: `1px solid ${theme.border}`,
                                borderRight: `1px solid ${theme.border}`,
                                borderBottom: `1px solid ${theme.border}`,
                                borderRadius: '12px',
                                backgroundColor: theme.background,
                                color: theme.text,
                                marginBottom: '15px',
                                minHeight: '260px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <h3>📞 Contacts</h3>

                            {summary.contacts.map((contact, index) => (
                                <div key={index}>
                                    <p>{contact.email}</p>
                                    <p>{contact.phone}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {summary.notes?.length > 0 && (
                        <div
                            style={{
                                padding: '20px',
                                borderLeft: '4px solid #f59e0b',
                                borderTop: `1px solid ${theme.border}`,
                                borderRight: `1px solid ${theme.border}`,
                                borderBottom: `1px solid ${theme.border}`,
                                borderRadius: '12px',
                                backgroundColor: theme.background,
                                color: theme.text,
                                minHeight: '260px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <h3>⚠️ Important Notes</h3>

                            {summary.notes?.map((note, index) => (
                                <p key={index}
                                style = {{
                                    margin: '6px 0',
                                    frontWeight: 'normal',
                                    fontSize: '16px',
                                    lineHeight: '1.5',
                                }}
                                >
                                    • {note}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
