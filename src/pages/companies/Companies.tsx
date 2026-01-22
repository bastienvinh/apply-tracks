import { Pagination } from "@/components/Pagination"
import { Button } from "@/components/ui/button"
import { CompaniesDataTable } from "@/features/companies/components/CompaniesDataTable"
import { useCompanies } from "@/features/companies/hooks/use-companies"
import { usePagination } from "@/hooks/use-pagination"
import { LucidePlus } from "lucide-react"

export function Companies() {

  const { page, limit } = usePagination({ defaultLimit: 10 })
  const { paginatedData } = useCompanies({ page, limit })
  
  return <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Entreprises</h1>
      <p>
        Contient tous la liste des entreprises
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex justify-end items-center">
          <div className="flex gap-2"><Button variant="outline"><LucidePlus /> Ajouter</Button></div>
        </div>

      <CompaniesDataTable data={paginatedData.data} />
      <Pagination 
        hasNextPage={paginatedData.has_next!}
        hasPrevPage={paginatedData.has_previous!}
        total={paginatedData.count}
        totalPages={paginatedData.total_pages!}
        />
      </div>
    </div>
}