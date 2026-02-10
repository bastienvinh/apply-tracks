"use client"

import React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  X,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

// ---------- Types ----------

interface FileWithPreview extends File {
  preview?: string
}

interface UploadedFile {
  id: string
  file: FileWithPreview
  progress: number
  status: "idle" | "uploading" | "success" | "error"
  errorMessage?: string
}

interface FileUploaderProps {
  accept?: string
  maxFiles?: number
  maxSizeMB?: number
  multiple?: boolean
  onFilesChange?: (files: File[]) => void
  className?: string
}

// ---------- Helpers ----------

function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(decimals))} ${sizes[i]}`
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return FileImage
  if (type.startsWith("video/")) return FileVideo
  if (type.startsWith("audio/")) return FileAudio
  if (type.includes("zip") || type.includes("rar") || type.includes("tar")) return FileArchive
  if (type.includes("pdf") || type.includes("doc") || type.includes("text")) return FileText
  return File
}

// ---------- Component ----------

export function FileUploader({
  accept,
  maxFiles = 5,
  maxSizeMB = 10,
  multiple = true,
  onFilesChange,
  className,
}: FileUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)

  // Notify parent of file changes
  useEffect(() => {
    onFilesChange?.(files.map((f) => f.file))
  }, [files, onFilesChange])

  // Clean up previews on unmount
  useEffect(() => {
    return () => {
      for (const f of files) {
        if (f.file.preview) URL.revokeObjectURL(f.file.preview)
      }
    }
  }, [files])

  const simulateUpload = useCallback((id: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 25
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress: 100, status: "success" } : f))
        )
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress, status: "uploading" } : f))
        )
      }
    }, 300)
  }, [])

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const newFiles: UploadedFile[] = []

      for (const raw of Array.from(incoming)) {
        if (files.length + newFiles.length >= maxFiles) break

        const file = raw as FileWithPreview

        // Validate size
        if (file.size > maxSizeMB * 1024 * 1024) {
          const id = crypto.randomUUID()
          newFiles.push({
            id,
            file,
            progress: 0,
            status: "error",
            errorMessage: `File exceeds ${maxSizeMB}MB limit`,
          })
          continue
        }

        // Generate preview for images
        if (file.type.startsWith("image/")) {
          file.preview = URL.createObjectURL(file)
        }

        const id = crypto.randomUUID()
        newFiles.push({ id, file, progress: 0, status: "idle" })
      }

      setFiles((prev) => {
        const updated = [...prev, ...newFiles]
        // Start simulated upload for valid files
        for (const f of newFiles) {
          if (f.status !== "error") {
            setTimeout(() => simulateUpload(f.id), 100)
          }
        }
        return updated
      })
    },
    [files.length, maxFiles, maxSizeMB, simulateUpload]
  )

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id)
      if (target?.file.preview) URL.revokeObjectURL(target.file.preview)
      return prev.filter((f) => f.id !== id)
    })
  }, [])

  // ---------- Drag handlers ----------

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current += 1
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current -= 1
    if (dragCounter.current === 0) setIsDragOver(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounter.current = 0
      setIsDragOver(false)
      if (e.dataTransfer.files?.length) {
        addFiles(e.dataTransfer.files)
      }
    },
    [addFiles]
  )

  const atLimit = files.length >= maxFiles

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Drop zone */}
      <button
        type="button"
        onClick={() => !atLimit && inputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        disabled={atLimit}
        className={cn(
          "group relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
          atLimit && "pointer-events-none opacity-50"
        )}
      >
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors",
            isDragOver && "bg-primary/10"
          )}
        >
          <Upload
            className={cn(
              "h-6 w-6 text-muted-foreground transition-colors",
              isDragOver && "text-primary"
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-foreground">
            {isDragOver ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="text-xs text-muted-foreground">
            or click to browse {accept ? `(${accept})` : ""} &middot; Max {maxSizeMB}MB per file
          </p>
        </div>
        {multiple && (
          <p className="text-xs text-muted-foreground">
            {files.length} / {maxFiles} files
          </p>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          if (e.target.files?.length) {
            addFiles(e.target.files)
            e.target.value = ""
          }
        }}
      />

      {/* File list */}
      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map((item) => {
            const Icon = getFileIcon(item.file.type)
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg border bg-card p-3 text-card-foreground"
              >
                {/* Thumbnail or icon */}
                {item.file.preview ? (
                  <img
                    src={item.file.preview || "/placeholder.svg"}
                    alt={item.file.name}
                    className="h-10 w-10 shrink-0 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}

                {/* Info */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.file.name}
                    </p>
                    <div className="flex shrink-0 items-center gap-2">
                      {item.status === "success" && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      )}
                      {item.status === "error" && (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeFile(item.id)}
                        aria-label={`Remove ${item.file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {formatBytes(item.file.size)}
                    </span>
                    {item.status === "error" && (
                      <span className="text-xs text-destructive">{item.errorMessage}</span>
                    )}
                  </div>

                  {(item.status === "uploading" || item.status === "idle") && (
                    <Progress value={item.progress} className="h-1.5" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
