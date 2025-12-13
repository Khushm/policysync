import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const FileUpload = () => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        setFile(file);
        // Simulate upload
        setUploading(true);
        setTimeout(() => setUploading(false), 2000);
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3>Upload SDOH / Zip Dataset</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Supported formats: .csv, .json, .xlsx
            </p>

            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={{
                    border: `2px dashed ${dragActive ? 'var(--accent-color)' : 'var(--border-color)'}`,
                    borderRadius: '12px',
                    padding: '2rem',
                    textAlign: 'center',
                    background: dragActive ? 'rgba(56, 189, 248, 0.05)' : 'transparent',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                }}
            >
                {!file ? (
                    <>
                        <Upload size={32} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
                        <p>Drag & Drop files here or <span style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>Browse</span></p>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            id="file-upload"
                            onChange={handleChange}
                        />
                        <label htmlFor="file-upload" style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}></label>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                        {uploading ? (
                            <div className="spinner" style={{ width: 24, height: 24, border: '3px solid var(--border-color)', borderTopColor: 'var(--accent-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                        ) : (
                            <CheckCircle size={32} color="var(--success)" />
                        )}
                        <div style={{ textAlign: 'left' }}>
                            <p style={{ fontWeight: '600' }}>{file.name}</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                {uploading ? 'Processing Risk Scores...' : 'Analysis Complete'}
                            </p>
                        </div>
                        {!uploading && (
                            <button
                                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                style={{ marginLeft: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                                Change
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* New style for animation */}
            <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default FileUpload;
