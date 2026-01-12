import { CompaniesService } from "@/services/companies";
import { useEffect } from "react"

export function Companies() {

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await CompaniesService.getAll()
        console.log("Fetched companies:", companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }

    fetchCompanies()
  }, [])

  return <div>Companies Page</div>
}