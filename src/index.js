import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Import from './routes/Import';
import Query from './routes/Query';
import Records from './routes/Records';
import Export from './routes/Export';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/import' element={<Import />} />
          <Route path='/export' element={<Export />} />
          <Route path='/query' element={<Query />} />
          <Route path='/records' element={<Records />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
