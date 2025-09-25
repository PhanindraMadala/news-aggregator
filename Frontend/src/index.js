import React from 'react';
import { createRoot } from 'react-dom/client';
import NewsAggregator from './NewsAggregator';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<NewsAggregator />);
