import { SearchInput } from "@/components/form/SearchInput"
import { Pagination } from "@/components/Pagination"
import { Button } from "@/components/ui/button"
import { CompaniesDataTable } from "@/features/companies/components/CompaniesDataTable"
import { useCompanies } from "@/features/companies/hooks/use-companies"
import { useGlobalSearch } from "@/hooks/use-global-search"
import { usePagination } from "@/hooks/use-pagination"
import { newCompanyRoute } from "@/routes"
import { LucidePlus } from "lucide-react"
import { Link } from "react-router"

export function Companies() {

  const { page, limit } = usePagination({ defaultLimit: 10 })
  const { term } = useGlobalSearch({ prefix: "companies" })
  const { paginatedData } = useCompanies({ page, limit })
  
  return <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Entreprises</h1>
      <p>
        Contient tous la liste des entreprises {term && `(recherche: ${term})`}
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">

          <div>
            <SearchInput prefix="companies" />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={newCompanyRoute()} className="flex items-center gap-2">
                <LucidePlus />
                Ajouter
              </Link>
            </Button>
            </div>
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