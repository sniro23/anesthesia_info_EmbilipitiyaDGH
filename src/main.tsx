
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize React first, then import interceptor
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Import fetch interceptor after React is initialized
import('./lib/fetchInterceptor.ts');
