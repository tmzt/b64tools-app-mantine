
import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";


import { App } from "./App";
import { MantineProvider, TypographyStylesProvider } from "@mantine/core";

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import './styles/glow.css';


const createApp = () => {
  return (
    <React.StrictMode>
    <MantineProvider>
      <TypographyStylesProvider>
        <App />
      </TypographyStylesProvider>
    </MantineProvider>
  </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(createApp());
