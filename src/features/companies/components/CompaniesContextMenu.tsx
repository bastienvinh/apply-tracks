import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Company } from "@/services/companies"
import { DefaultApplicationService } from "@/services/defaultApplication"
import { Eye, Pencil, Send, Trash2 } from "lucide-react"
import { useDeleteCompany } from "../hooks/use-companies-mutation"
import { useNavigate } from "react-router"
import { updateCompanyRoute } from "@/routes"


type CompaniesContextMenuProps = {
  className?: string
  children?: React.ReactNode
  data?: Company
}

export function CompaniesContextMenu({ children, data }: CompaniesContextMenuProps) {

  const { mutate: deleteCompany } = useDeleteCompany()
  const navigate = useNavigate()
  
  function handleCopyId() {
    if (data) { 
      return navigator.clipboard.writeText(data.id); 
    }
  }

  function handleVisitWebsite() {
    if (data && data.website?.length) {
      const url = data.website.startsWith("http") ? data.website : `https://${data.website}`;
      DefaultApplicationService.openWebsite(url)
    }
  }

  function handleDelete() {
    if (data) {
      deleteCompany(data.id);
    }
  }

  function handleEdit() {
    if (data) {
      navigate(updateCompanyRoute(data.id));
    }
  }

  // If the company is default, we don't want to show the context menu
  if (data?.is_default) {
    return children
  }
  
  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-full">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem onClick={handleCopyId}>Copy ID</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />

        <ContextMenuGroup>
          <ContextMenuItem><Eye />Voir Détail</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />

        <ContextMenuGroup>
          <ContextMenuItem onClick={handleVisitWebsite}><Send />Visiter leur site web</ContextMenuItem>
          <ContextMenuItem onClick={handleEdit}><Pencil /> Modifier</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem onClick={handleDelete} variant="destructive" ><Trash2 /> Supprimer</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}