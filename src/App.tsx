import { Outlet } from "react-router"
import "./App.css"
import { DetectScreensize } from "./components/DetectScreensize"
import { AppSideBar } from "./components/AppSideBar"
import { SidebarInset } from "./components/ui/sidebar"
import { SidebarHeader } from "./components/sidebar-header"

function App() {

  return (
    <DetectScreensize>
      <div className="h-screen w-screen flex">
        <AppSideBar />
        <SidebarInset>
          <SidebarHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-6 p-4">
                <Outlet />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </DetectScreensize>
  );
}

export default App;
