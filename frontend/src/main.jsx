// Import React StrictMode for additional development checks
import { StrictMode } from 'react';
// Import ReactDOM root creation
import { createRoot } from 'react-dom/client';
// Import global styles
import './index.css';
// Import main App component
import App from './App.jsx';

// Initialize React application
// StrictMode: Highlights potential problems in the app during development
creatRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
