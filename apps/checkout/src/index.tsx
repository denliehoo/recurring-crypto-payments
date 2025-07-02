import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
} else {
  throw new Error('Root element not found');
}
