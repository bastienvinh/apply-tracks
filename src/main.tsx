import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import { BrowserRouter, Route, Routes } from "react-router"
import { Dashboard } from "./pages/Dashboard"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
