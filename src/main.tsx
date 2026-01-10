import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import { BrowserRouter, Route, Routes } from "react-router"
import { Dashboard } from "./pages/Dashboard"
import { SidebarProvider } from "./components/ui/sidebar"
import { Contacts } from "./pages/Contacts"
import { Applications } from "./pages/Applications"
import { Feedbacks } from "./pages/Feedbacks"
import { Tags } from "./pages/Tags"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Dashboard />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="list" element={<Applications />} />
            <Route path="feedbacks" element={<Feedbacks />} />
            <Route path="tags" element={<Tags />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  </React.StrictMode>,
)
