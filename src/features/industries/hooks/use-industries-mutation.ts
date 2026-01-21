import { IndustriesService } from "@/services/industries"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteIndustry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => IndustriesService.removeById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['industries'] })
    },
    onError: (error) => {
      console.error("Error deleting industry:", error)
    }
  })
}