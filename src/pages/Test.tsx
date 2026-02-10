import { FileUploader } from "@/components/FileUploader";

export function Test() {
  return <div>
    <FileUploader
      accept="image/*,.pdf,.doc,.docx,.txt,.zip"
      maxFiles={10}
      maxSizeMB={20}
      multiple
    />  
  </div>
}