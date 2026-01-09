import { invoke } from "@tauri-apps/api/core"
import { useEffect, useState } from "react";

interface SystemInfo {
  screen_width: number;
  screen_height: number;
  scale_factor: number;
  architecture: string;
  platform: string;
}

// Standalone function to get system info
export async function getSystemInfo(): Promise<SystemInfo> {
  return await invoke<SystemInfo>('get_system_info')
}

export function DetectScreensize({ children }: { children?: React.ReactNode }) {
  const [monitorSize, setMonitorSize] = useState({ width: 0, height: 0 })
  const [platform, setPlatform] = useState<string>("windows")
  const [scaleFactor, setScaleFactor] = useState<number>(1)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    async function fetchSystemInfo() {
      try {
        const info = await getSystemInfo();
        console.log(info)
        setMonitorSize({ width: info.screen_width, height: info.screen_height })
        setPlatform(info.platform)
        setScaleFactor(info.scale_factor)
      } catch (error) {
        console.error("Error fetching system info:", error)
      }
    }

    fetchSystemInfo();

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      console.log("Window resized:", window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // TODO: Improve this code for the other environment
  if (platform === 'macos' && scaleFactor >= 2 && windowSize.width * scaleFactor < monitorSize.width) {
    return <div>Veuillez mettre en plein écran</div>
  }

  return children;
}