import { Outlet } from "react-router"
import "./App.css"
import { DetectScreensize } from "./components/DetectScreensize"
import { AppSideBar } from "./components/AppSideBar"
import { SidebarInset } from "./components/ui/sidebar"
import { SidebarHeader } from "./components/SidebarHeader"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "./components/ui/sonner"

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient} >
      <DetectScreensize>
        <div className="h-screen w-screen flex">
          <AppSideBar />
          <SidebarInset className="overflow-hidden">
            <SidebarHeader />
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="@container/main flex flex-1 flex-col gap-2 overflow-hidden">
                <div className="flex flex-col gap-6 p-4 overflow-scroll">
                  <Outlet />
                </div>
              </div>
            </div>
          </SidebarInset>
          <Toaster />
        </div>
      </DetectScreensize>  
    </QueryClientProvider>
    
  );
}

export default App;
