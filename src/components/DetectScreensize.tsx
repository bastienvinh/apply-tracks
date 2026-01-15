import { invoke } from "@tauri-apps/api/core"
import { useEffect, useState } from "react"
import { Maximize2 } from "lucide-react"
import { Button } from "./ui/button"

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
        const info = await getSystemInfo()
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

  const toggleFullscreen = async () => {
    try {
      const { getCurrentWindow } = await import("@tauri-apps/api/window")
      const appWindow = getCurrentWindow()
      await appWindow.setFullscreen(true)
    } catch (error) {
      console.error("Failed to toggle fullscreen:", error)
    }
  }

  // TODO: Improve this code for the other environment
  if (platform === 'macos' && scaleFactor >= 2 && windowSize.width * scaleFactor < monitorSize.width) {
    return <main className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center gap-8 text-center">
        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Agrandissez pour la meilleure expérience
          </h1>
          <p className="text-muted-foreground">
            Cliquez sur le bouton ci-dessous pour maximiser votre écran
          </p>
        </div>

        {/* Resize Button */}
        <Button onClick={toggleFullscreen} size="lg" className="gap-2 px-8 py-6 text-lg">
          <Maximize2 className="h-5 w-5" />
          Plein Écran
        </Button>

        {/* Helper text */}
        <p className="text-sm text-muted-foreground/70">
          Tauri détecté
        </p>
      </div>
    </main>
  }

  return children;
}