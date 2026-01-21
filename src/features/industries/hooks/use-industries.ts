import { IndustriesService, PaginatedIndustries } from '@/services/industries';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

interface UseIndustriesOptions {
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export function useIndustries(options?: UseIndustriesOptions) {
  const isPaginated = options?.page !== undefined || options?.limit !== undefined;
  const { page = 1, limit = 10, enabled = true } = options ?? {};

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: isPaginated ? ['industries', { page, limit }] : ['industries'],
    queryFn: () => isPaginated 
      ? IndustriesService.getPaginated(page, limit)
      : IndustriesService.getAll(),
    placeholderData: isPaginated ? keepPreviousData : undefined,
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    paginatedData: data ?? ({ count: 0, data: [] } as PaginatedIndustries),
    ...(isPaginated && {
      pagination: {
        page,
        limit,
      },
    }),
    isLoading,
    isFetching,
    error,
  };
}