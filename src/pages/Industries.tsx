import { Pagination } from "@/components/Pagination"
import { Button } from "@/components/ui/button"
import { IndustriesTable } from "@/features/industries/components/IndustriesTable"
import { useIndustries } from "@/features/industries/hooks/use-industries"
import { useDeleteIndustry } from "@/features/industries/hooks/use-industries-mutation"
import { usePagination } from "@/hooks/use-pagination"
import { LucidePlus } from "lucide-react"
import { toast } from "sonner"

export function Industries() {

  const { page, limit } = usePagination({ defaultLimit: 10 })
  const { paginatedData, isLoading, error } = useIndustries({ page, limit })
  const { mutate: deleteIndustry } = useDeleteIndustry()

  function handleDeleteIndustry(id: string) {
    deleteIndustry(id)
    toast.success(`Suppression du secteur d'activité effectuée: ${id}`)
  }

  if (isLoading) {
    return <div>Chargement...</div>
  }

  if (error) {
    return <div>Erreur de chargement des secteurs d'activités.</div>
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Secteur d'activités</h1>
      <p>
        Contient tous les secteurs d'activités possibles pour les entreprises
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex justify-end items-center">
          <div className="flex gap-2"><Button variant={"outline"}><LucidePlus /> Ajouter</Button></div>
        </div>

      <IndustriesTable data={paginatedData.data} onDelete={handleDeleteIndustry} />
      <Pagination 
        hasNextPage={paginatedData.has_next!}
        hasPrevPage={paginatedData.has_previous!}
        total={paginatedData.count}
        totalPages={paginatedData.total_pages!}
        />
      </div>
    </div>
  )
}