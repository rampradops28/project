import React, { useState, useRef } from 'react';
import { Upload, Sliders } from 'lucide-react';
import '../styles/FileUpload.css';

export const FileUpload = ({ onAnalyze, isLoading }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [threshold, setThreshold] = useState(0.8);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (file) {
      onAnalyze(file, threshold);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className="file-upload-section">
      <h2>Upload Dataset</h2>
      <p>Upload a CSV file containing original and suspect texts for plagiarism analysis</p>
      
      <div 
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          accept=".csv" 
          onChange={handleFileChange} 
          className="file-input"
        />
        
        <Upload size={48} className="upload-icon" />
        <p className="upload-text">
          {file ? file.name : 'Drag and drop your CSV file here or click to browse'}
        </p>
        {file && (
          <p className="file-selected">
            File selected: <strong>{file.name}</strong>
          </p>
        )}
      </div>
      
      <div className="threshold-control">
        <div className="threshold-header">
          <Sliders size={18} />
          <h3>Similarity Threshold: {threshold.toFixed(2)}</h3>
        </div>
        <p className="threshold-description">
          Adjust the similarity threshold to classify texts as plagiarized (higher values are more strict)
        </p>
        <input 
          type="range" 
          min="0.5" 
          max="1" 
          step="0.01" 
          value={threshold}
          onChange={e => setThreshold(parseFloat(e.target.value))}
          className="threshold-slider"
        />
        <div className="threshold-labels">
          <span>0.5</span>
          <span>0.75</span>
          <span>1.0</span>
        </div>
      </div>
      
      <button 
        className="analyze-button" 
        onClick={handleAnalyze}
        disabled={!file || isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze for Plagiarism'}
      </button>
    </section>
  );
};

 