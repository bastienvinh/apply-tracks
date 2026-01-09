import { Outlet } from "react-router";
import "./App.css";
import { DetectScreensize } from "./components/DetectScreensize";

function App() {

  return (
    <DetectScreensize>
      <div className="h-screen w-screen">
        <Outlet />
      </div>
    </DetectScreensize>
  );
}

export default App;
