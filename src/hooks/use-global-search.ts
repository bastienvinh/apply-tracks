import { parseAsString, useQueryState } from "nuqs"

export interface UseGlobalSearchOptions {
  prefix?: string
}

export interface UsePaginationReturn {
  resetSearch(): void,
  setTerm(search: string): void,
  term: string
}

export function useGlobalSearch(options?: UseGlobalSearchOptions): UsePaginationReturn {
  
  const searchKey = options?.prefix ? `${options.prefix}_term` : 'term'
  
  const [term, setQueryTerm] = useQueryState(searchKey, parseAsString.withDefault(""))

  const resetSearch = () => setQueryTerm('')

  function setTerm(newSearch: string) {
    setQueryTerm(newSearch.trim())
  }

  return {
    term,
    setTerm,
    resetSearch,
  }
}