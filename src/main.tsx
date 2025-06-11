
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/fetchInterceptor.ts'

createRoot(document.getElementById("root")!).render(<App />);
