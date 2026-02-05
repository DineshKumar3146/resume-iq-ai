import React from 'react';

export default function HistoryView({ history, onView, onDelete, onClear }) {
    if (!history || history.length === 0) return null;

    // Helper: Format date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <section className="history-section">
            <div className="container">
                <div className="history-header">
                    <h2 className="section-title">Analysis History</h2>
                    <button className="btn-secondary" onClick={onClear}>Clear History</button>
                </div>
                <div className="history-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {history.map((app) => (
                        <div key={app.id} className="history-card" onClick={() => onView(app)} style={{ cursor: 'pointer', background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>
                            <div className="history-header-info" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div>
                                    <div className="history-company" style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1e293b' }}>{app.companyName}</div>
                                    <div className="history-job" style={{ color: '#64748b', fontSize: '0.9rem' }}>{app.jobTitle}</div>
                                </div>
                                <div className="history-score" style={{ fontWeight: '800', fontSize: '1.5rem', color: '#6366f1' }}>
                                    {Math.round(app.analysis.overallScore)}
                                </div>
                            </div>
                            <div className="history-date" style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                {formatDate(app.timestamp || app.date)}
                            </div>
                            <div className="history-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn-small btn-view" onClick={(e) => { e.stopPropagation(); onView(app); }} style={{ padding: '0.5rem 1rem', border: '1px solid #6366f1', background: 'transparent', color: '#6366f1', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                                    View
                                </button>
                                <button className="btn-small btn-delete" onClick={(e) => { e.stopPropagation(); onDelete(app.id); }} style={{ padding: '0.5rem 1rem', border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
