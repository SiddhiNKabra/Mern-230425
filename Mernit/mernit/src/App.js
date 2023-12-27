import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const queryAPI = async () => {
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/codellama/CodeLlama-13b-hf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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',
        },
        body: JSON.stringify({ 
          inputs: input,
          // options: {
          //   max_length: 1024, // Set the desired max length (adjust as needed)
          // },
         }),
      });

      const result = await response.json();

      // Log the entire result object for better error analysis
      console.log('API Response:', result);

      setOutput(result[0]?.generated_text || 'No generated text available');
    } catch (error) {
      console.error('Error querying the API:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Code Generator App</h1>

      <div className="input-container">
        <label>
          Enter your input:
          <textarea
            rows="4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your code or text here"
          />
        </label>
        <button onClick={queryAPI}>Generate Code</button>
      </div>

      <div className="output-container">
        <h2>Generated Code:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default App;