import { Outlet } from "react-router";
import "./App.css";
import { DetectScreensize } from "./components/DetectScreensize";
import { AppSideBar } from "./components/AppSideBar";

function App() {

  return (
    <DetectScreensize>
      <div className="h-screen w-screen dark flex">
        <AppSideBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </DetectScreensize>
  );
}

export default App;
