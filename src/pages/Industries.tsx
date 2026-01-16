import { Pagination } from "@/components/Pagination"
import { IndustriesTable } from "@/features/industries/components/IndustriesTable"
import { useIndustries } from "@/features/industries/hooks/use-industries"
import { usePagination } from "@/hooks/use-pagination"

export function Industries() {

  const { page, limit } = usePagination({ defaultLimit: 10 })
  const { paginatedData, isLoading, error } = useIndustries({ page, limit })

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

      <IndustriesTable data={paginatedData.data} />
      <Pagination 
          hasNextPage={paginatedData.has_next!}
          hasPrevPage={paginatedData.has_previous!}
          total={paginatedData.count}
          totalPages={paginatedData.total_pages!}
        />
    </div>
  )
}