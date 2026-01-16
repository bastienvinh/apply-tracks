import { useQueryState, parseAsInteger } from 'nuqs'

export interface UsePaginationOptions {
  defaultPage?: number
  defaultLimit?: number
  prefix?: string
}

export interface UsePaginationReturn {
  page: number
  limit: number
  offset: number
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  nextPage: () => void
  prevPage: () => void
  resetPage: () => void
}

export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const { defaultPage = 1, defaultLimit = 10, prefix = '' } = options

  const pageKey = prefix ? `${prefix}_page` : 'page'
  const limitKey = prefix ? `${prefix}_limit` : 'limit'

  const [page, setPageState] = useQueryState(
    pageKey,
    parseAsInteger.withDefault(defaultPage)
  )

  const [limit, setLimitState] = useQueryState(
    limitKey,
    parseAsInteger.withDefault(defaultLimit)
  )

  const setPage = (newPage: number) => {
    setPageState(Math.max(1, newPage))
  }

  const setLimit = (newLimit: number) => {
    setLimitState(Math.max(1, newLimit))
    setPageState(1) // Reset to first page when limit changes
  }

  const nextPage = () => setPage(page + 1)
  const prevPage = () => setPage(Math.max(1, page - 1))
  const resetPage = () => setPage(defaultPage)

  const offset = (page - 1) * limit

  return {
    page,
    limit,
    offset,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    resetPage,
  }
}