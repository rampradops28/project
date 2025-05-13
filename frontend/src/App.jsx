import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Header } from './components/Header';
import { ThemeProvider } from './context/ThemeContext'; 
import './styles/App.css'; 

function App() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleFileAnalysis = async (file, threshold) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await processFile(file, threshold);
      setResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <section className="hero-section">
            <h1>Plagiarism Detection</h1>
            <p>Upload your dataset and detect plagiarized content using advanced machine learning algorithms</p>
          </section>
          
          <FileUpload onAnalyze={handleFileAnalysis} isLoading={isLoading} />
          
          {error && <div className="error-message">{error}</div>}
          
          {isLoading && <LoadMan />} {/* Show LoadMan when loading */}
          
          {results && !isLoading && (
            <ResultsDisplay results={results} />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

 