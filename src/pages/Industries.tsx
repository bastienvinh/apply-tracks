import { Pagination } from "@/components/Pagination"
import { IndustriesTable } from "@/features/industries/components/IndustriesTable"
import { useIndustries } from "@/features/industries/hooks/use-industries"
import { useDeleteIndustry } from "@/features/industries/hooks/use-industries-mutation"
import { usePagination } from "@/hooks/use-pagination"
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
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading industries.</div>
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Secteur d'activités</h1>
      <p>
        Contient tous les secteurs d'activités possibles pour les entreprises
      </p>

      <IndustriesTable data={paginatedData.data} onDelete={handleDeleteIndustry} />
      <Pagination 
        hasNextPage={paginatedData.has_next!}
        hasPrevPage={paginatedData.has_previous!}
        total={paginatedData.count}
        totalPages={paginatedData.total_pages!}
        />
    </div>
  )
}