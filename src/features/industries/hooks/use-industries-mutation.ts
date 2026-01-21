import { IndustriesService, IndustryCreatePayload } from "@/services/industries"
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

export function useCreateIndustry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: IndustryCreatePayload) => IndustriesService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['industries'] })
    },
    onError: (error) => {
      console.error("Error creating industry:", error)
    }
  })
}