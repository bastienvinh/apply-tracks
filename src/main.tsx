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
import { Companies } from "./pages/companies/Companies"
import { Industries } from "./pages/industries/Industries"
import { CreateIndustry } from "./pages/industries/CreateIndustry"
import { UpdateIndustry } from "./pages/industries/UpdateIndustry"
import { CreateCompany } from "./pages/companies/CreateCompany"
import { UpdateCompany } from "./pages/companies/UpdateCompany"

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
              <Route path="companies/new" element={<CreateCompany />} />
              <Route path="companies/:id" element={<UpdateCompany />} />
              <Route path="industries" element={<Industries />} />
              <Route path="industries/new" element={<CreateIndustry />} />
              <Route path="industries/:id" element={<UpdateIndustry />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </NuqsAdapter>

  </React.StrictMode>,
)
