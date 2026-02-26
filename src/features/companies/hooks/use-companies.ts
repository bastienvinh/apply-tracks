import { CompaniesService, PaginatedCompanies } from "@/services/companies"
import { useQuery, keepPreviousData } from '@tanstack/react-query'

interface UseCompaniesOptions {
  page?: number
  limit?: number
  term?: string
}

export function useCompanies(options?: UseCompaniesOptions) {
  const isPaginated = options?.page !== undefined || options?.limit !== undefined || options?.term !== undefined
  const { page = 1, limit = 10, term = "" } = options ?? {}

  console.log(isPaginated)

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: isPaginated ? ['companies', { page, limit, term }] : ['companies'],
    queryFn: () => isPaginated 
      ? CompaniesService.getAllPaginated(page, limit)
      : CompaniesService.getAll(),
    placeholderData: isPaginated ? keepPreviousData : undefined,
    enabled: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  return {
    paginatedData: data ?? ({ count: 0, data: [] } as PaginatedCompanies),
    ...(isPaginated && {
      pagination: {
        page,
        limit,
      },
    }),
    isLoading,
    isFetching,
    error,
  }
}

export function useCompany(id: string, enabled = true) {
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['company', id],
    queryFn: () => CompaniesService.getById(id),
    enabled: enabled && !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  return {
    data,
    isLoading,
    isFetching,
    error,
  }
}