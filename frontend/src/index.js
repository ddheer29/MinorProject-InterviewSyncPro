import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SocketProvider } from './context/SocketProvider';
import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SocketProvider>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </SocketProvider>
);
