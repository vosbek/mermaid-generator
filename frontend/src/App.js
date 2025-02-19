import React, { useState } from 'react';
import TextInput from './components/TextInput';
import DiagramPreview from './components/DiagramPreview';
import ErrorDisplay from './components/ErrorDisplay';
import LoadingIndicator from './components/LoadingIndicator';
import ExportButtons from './components/ExportButtons';
import { generateDiagram } from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [diagram, setDiagram] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await generateDiagram(input);
      setDiagram(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mermaid Architecture Generator</h1>
      </header>
      
      <main className="App-main">
        <TextInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          disabled={loading}
        />
        
        {loading && <LoadingIndicator />}
        
        {error && <ErrorDisplay error={error} />}
        
        {diagram && (
          <>
            <DiagramPreview diagram={diagram} />
            <ExportButtons diagram={diagram} />
          </>
        )}
      </main>
    </div>
  );
}

export default App; 