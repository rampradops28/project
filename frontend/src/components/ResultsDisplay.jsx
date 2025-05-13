import React, { useRef } from 'react';
import { BarChart, Download, AlertCircle, CheckCircle, Info } from 'lucide-react';
import '../styles/ResultsDisplay.css';

export const ResultsDisplay = ({ results }) => {
  const resultsRef = useRef(null);
  
  const getSimilarityColor = (score) => {
    if (score >= 0.8) return 'high-similarity';
    if (score >= 0.6) return 'medium-similarity';
    return 'low-similarity';
  };
  
  const getStatusText = (prediction) => {
    return prediction === 1 ? 'Plagiarized' : 'Original';
  };
  
  const getStatusIcon = (prediction) => {
    return prediction === 1 
      ? <AlertCircle size={16} className="status-icon plagiarized" /> 
      : <CheckCircle size={16} className="status-icon original" />;
  };
  
  const exportResults = () => {
    if (!resultsRef.current) return;
    
    const jsonString = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `plagiarism-results-${results.fileName.split('.')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="results-section" ref={resultsRef}>
      <div className="results-header">
        <h2>Plagiarism Analysis Results</h2>
        <button className="export-button" onClick={exportResults}>
          <Download size={16} />
          Export Results
        </button>
      </div>
      
      <div className="file-info">
        <p>File: <strong>{results.fileName}</strong></p>
        <p>Threshold: <strong>{results.threshold.toFixed(2)}</strong></p>
      </div>
      
      <div className="metrics-card">
        <div className="metrics-header">
          <BarChart size={20} />
          <h3>Classification Metrics</h3>
        </div>
        <div className="metrics-grid">
          <div className="metric">
            <h4>Accuracy</h4>
            <div className="metric-value">{(results.report.accuracy * 100).toFixed(1)}%</div>
          </div>
          <div className="metric">
            <h4>Precision</h4>
            <div className="metric-value">{(results.report.precision * 100).toFixed(1)}%</div>
          </div>
          <div className="metric">
            <h4>Recall</h4>
            <div className="metric-value">{(results.report.recall * 100).toFixed(1)}%</div>
          </div>
          <div className="metric">
            <h4>F1 Score</h4>
            <div className="metric-value">{(results.report.f1Score * 100).toFixed(1)}%</div>
          </div>
        </div>
      </div>
      
      <div className="similarity-results">
        <h3>Document Comparison Results</h3>
        <div className="similarity-note">
          <Info size={16} />
          <p>Documents with similarity scores above the threshold ({results.threshold.toFixed(2)}) are classified as plagiarized</p>
        </div>
        
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Similarity Score</th>
              <th>Visual Indicator</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {results.similarityScores.map((score, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{score.toFixed(2)}</td>
                <td>
                  <div className="similarity-bar-container">
                    <div 
                      className={`similarity-bar ${getSimilarityColor(score)}`} 
                      style={{ width: `${score * 100}%` }}
                    ></div>
                  </div>
                </td>
                <td className="status-cell">
                  {getStatusIcon(results.predictions[index])}
                  <span className={results.predictions[index] === 1 ? 'plagiarized' : 'original'}>
                    {getStatusText(results.predictions[index])}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
// import React, { useRef } from 'react';
// import { BarChart, Download, AlertCircle, CheckCircle, Info } from 'lucide-react';
// import '../styles/ResultsDisplay.css';

// export const ResultsDisplay = ({ results }) => {
//   const resultsRef = useRef(null);

//   // Function to determine similarity color
//   const getSimilarityColor = (score) => {
//     if (score >= 0.8) return 'high-similarity';
//     if (score >= 0.6) return 'medium-similarity';
//     return 'low-similarity';
//   };

//   // Function to determine status text based on prediction
//   const getStatusText = (prediction) => {
//     return prediction === 1 ? 'Plagiarized' : 'Original';
//   };

//   // Function to return appropriate status icon based on prediction
//   const getStatusIcon = (prediction) => {
//     return prediction === 1 
//       ? <AlertCircle size={16} className="status-icon plagiarized" /> 
//       : <CheckCircle size={16} className="status-icon original" />;
//   };

//   // Function to handle exporting results as JSON
//   const exportResults = () => {
//     if (!resultsRef.current) return;

//     const jsonString = JSON.stringify(results, null, 2);
//     const blob = new Blob([jsonString], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `plagiarism-results-${results.file_name.split('.')[0]}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <section className="results-section" ref={resultsRef}>
//       <div className="results-header">
//         <h2>Plagiarism Analysis Results</h2>
//         <button className="export-button" onClick={exportResults}>
//           <Download size={16} />
//           Export Results
//         </button>
//       </div>

//       <div className="file-info">
//         <p>File: <strong>{results.file_name}</strong></p>
//         <p>Threshold: <strong>{results.threshold.toFixed(2)}</strong></p>
//       </div>

//       <div className="metrics-card">
//         <div className="metrics-header">
//           <BarChart size={20} />
//           <h3>Classification Metrics</h3>
//         </div>
//         <div className="metrics-grid">
//           <div className="metric">
//             <h4>Accuracy</h4>
//             <div className="metric-value">{(results.report.accuracy * 100).toFixed(1)}%</div>
//           </div>
//           <div className="metric">
//             <h4>Precision</h4>
//             <div className="metric-value">{(results.report.precision * 100).toFixed(1)}%</div>
//           </div>
//           <div className="metric">
//             <h4>Recall</h4>
//             <div className="metric-value">{(results.report.recall * 100).toFixed(1)}%</div>
//           </div>
//           <div className="metric">
//             <h4>F1 Score</h4>
//             <div className="metric-value">{(results.report.f1Score * 100).toFixed(1)}%</div>
//           </div>
//         </div>
//       </div>

//       <div className="similarity-results">
//         <h3>Document Comparison Results</h3>
//         <div className="similarity-note">
//           <Info size={16} />
//           <p>Documents with similarity scores above the threshold ({results.threshold.toFixed(2)}) are classified as plagiarized</p>
//         </div>

//         <table className="results-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Similarity Score</th>
//               <th>Visual Indicator</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.similarity_scores.map((score, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{score.toFixed(2)}</td>
//                 <td>
//                   <div className="similarity-bar-container">
//                     <div 
//                       className={`similarity-bar ${getSimilarityColor(score)}`} 
//                       style={{ width: `${score * 100}%` }}
//                     ></div>
//                   </div>
//                 </td>
//                 <td className="status-cell">
//                   {getStatusIcon(results.predictions[index])}
//                   <span className={results.predictions[index] === 1 ? 'plagiarized' : 'original'}>
//                     {getStatusText(results.predictions[index])}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };


// import React, { useRef } from 'react';
// import { BarChart, Download, AlertCircle, CheckCircle, Info } from 'lucide-react';
// import '../styles/ResultsDisplay.css';

// export const ResultsDisplay = ({ results }) => {
//   const resultsRef = useRef(null);

//   // Handle similarity color
//   const getSimilarityColor = (score) => {
//     if (score >= 0.8) return 'high-similarity';
//     if (score >= 0.6) return 'medium-similarity';
//     return 'low-similarity';
//   };

//   // Get status text
//   const getStatusText = (prediction) => prediction === 1 ? 'Plagiarized' : 'Original';

//   // Get status icon
//   const getStatusIcon = (prediction) => (
//     prediction === 1 
//       ? <AlertCircle size={16} className="status-icon plagiarized" />
//       : <CheckCircle size={16} className="status-icon original" />
//   );

//   // Export results as JSON
//   const exportResults = () => {
//     if (!resultsRef.current || !results) return;

//     const jsonString = JSON.stringify(results, null, 2);
//     const blob = new Blob([jsonString], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `plagiarism-results-${results.file_name?.split('.')[0] || 'unknown'}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   if (!results || !results.similarity_scores || !results.predictions) {
//     return (
//       <div className="results-section">
//         <p>No results to display. Please upload and analyze a file first.</p>
//       </div>
//     );
//   }

//   const { file_name, threshold, similarity_scores, predictions, report } = results;

//   return (
//     <section className="results-section" ref={resultsRef}>
//       {/* Header */}
//       <div className="results-header">
//         <h2>Plagiarism Analysis Results</h2>
//         <button className="export-button" onClick={exportResults}>
//           <Download size={16} />
//           Export Results
//         </button>
//       </div>

//       {/* File Info */}
//       {/* <div className="file-info">
//         <p>📄 File: <strong>{file_name || 'Unknown'}</strong></p>
//         <p>🎯 Threshold: <strong>{threshold?.toFixed(2) || '-'}</strong></p>
//       </div> */}

//       {/* Metrics
//       {report && (
//         <div className="metrics-card">
//           <div className="metrics-header">
//             <BarChart size={20} />
//             <h3>Classification Metrics</h3>
//           </div>
//           <div className="metrics-grid">
//             <div className="metric">
//               <h4>Accuracy</h4>
//               <div className="metric-value">{(report.accuracy * 100).toFixed(1)}%</div>
//             </div>
//             <div className="metric">
//               <h4>Precision</h4>
//               <div className="metric-value">{(report.precision * 100).toFixed(1)}%</div>
//             </div>
//             <div className="metric">
//               <h4>Recall</h4>
//               <div className="metric-value">{(report.recall * 100).toFixed(1)}%</div>
//             </div>
//             <div className="metric">
//               <h4>F1 Score</h4>
//               <div className="metric-value">{(report.f1Score * 100).toFixed(1)}%</div>
//             </div>
//           </div>
//         </div>
//       )} */}

//       {/* Comparison Results */}
//       <div className="similarity-results">
//         <h3>Document Comparison Results</h3>
//         <div className="similarity-note">
//           <Info size={16} />
//           <p>
//             Documents with similarity scores above the threshold ({threshold?.toFixed(2)}) 
//             are classified as <strong>plagiarized</strong>.
//           </p>
//         </div>

//         <table className="results-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Similarity Score</th>
//               <th>Visual Indicator</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {similarity_scores.map((score, index) => (
//               <tr key={index} title={`Score: ${score.toFixed(2)}`}>
//                 <td>{index + 1}</td>
//                 <td>{score.toFixed(2)}</td>
//                 <td>
//                   <div className="similarity-bar-container">
//                     <div
//                       className={`similarity-bar ${getSimilarityColor(score)}`}
//                       style={{ width: `${score * 100}%` }}
//                     ></div>
//                   </div>
//                 </td>
//                 <td className="status-cell">
//                   {getStatusIcon(predictions[index])}
//                   <span className={predictions[index] === 1 ? 'plagiarized' : 'original'}>
//                     {getStatusText(predictions[index])}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };
