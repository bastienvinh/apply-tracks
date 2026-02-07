import { CompaniesService, Company } from "@/services/companies"
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

export function useCreateCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (company: Partial<Company>) => CompaniesService.create(company),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
    onError: (error) => {
      console.error("Error creating company:", error)
    }
  })
}

export function useUpdateCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (company: Partial<Company> & { id: string }) => CompaniesService.update(company.id, company),
    onSuccess: (payload) => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
      queryClient.invalidateQueries({ queryKey: ['company', payload.id] })
    },
    onError: (error) => {
      console.error("Error updating company:", error)
    }
  })
}