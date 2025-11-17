import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ToolkitIndex from './pages/ToolkitIndex';
import LiquidityPoolDemo from './tools/LiquidityPoolDemo';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/toolkit" element={<ToolkitIndex />} />
        <Route path="/toolkit/liquidity-pool" element={<LiquidityPoolDemo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);