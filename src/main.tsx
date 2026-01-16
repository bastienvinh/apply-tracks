import React from "react"
import ReactDOM from "react-dom/client"
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'

import App from "./App"

import { BrowserRouter, Route, Routes } from "react-router"
import { Dashboard } from "./pages/Dashboard"
import { SidebarProvider } from "./components/ui/sidebar"
import { Contacts } from "./pages/Contacts"
import { Applications } from "./pages/Applications"
import { Feedbacks } from "./pages/Feedbacks"
import { Tags } from "./pages/Tags"
import { Companies } from "./pages/Companies"
import { Industries } from "./pages/Industries"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>

    <NuqsAdapter>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Dashboard />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="list" element={<Applications />} />
              <Route path="feedbacks" element={<Feedbacks />} />
              <Route path="tags" element={<Tags />} />
              <Route path="companies" element={<Companies />} />
              <Route path="industries" element={<Industries />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </NuqsAdapter>

  </React.StrictMode>,
)
