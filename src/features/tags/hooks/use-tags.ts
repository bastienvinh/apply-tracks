import { useQuery } from "@tanstack/react-query"

interface UseTagsOptions {
  page?: number
  limit?: number
}

export function useCompanies(options?: UseTagsOptions) {
  const isPaginated = options?.page !== undefined || options?.limit !== undefined
  const { page = 1, limit = 10 } = options ?? {}

  console.log(isPaginated)

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: isPaginated ? ['companies', { page, limit }] : ['companies'],
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