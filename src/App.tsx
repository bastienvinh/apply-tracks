import { Outlet } from "react-router";
import "./App.css";
import { DetectScreensize } from "./components/DetectScreensize";
import { Navigation } from "./components/Navigation";

function App() {

  return (
    <DetectScreensize>
      <div className="h-screen w-screen">
        <Navigation />
        <Outlet />
      </div>
    </DetectScreensize>
  );
}

export default App;
