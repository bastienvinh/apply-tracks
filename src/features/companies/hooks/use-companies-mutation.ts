import { CompaniesService } from "@/services/companies"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => CompaniesService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
    onError: (error) => {
      console.error("Error deleting company:", error)
    }
  })
}