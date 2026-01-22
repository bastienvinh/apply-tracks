import { useCompanies } from "@/features/companies/hooks/use-companies"

export function Companies() {

  const { paginatedData: companies } = useCompanies({ page: 1, limit: 10 })
  
  return <ul>
    {companies.data.map(company => (
      <li key={company.id}>
        <h3>{company.name}</h3>
        <p>Website: {company.website ?? 'N/A'}</p>
        <p>Location: {company.location ?? 'N/A'}</p>
        <p>Notes: {company.notes ?? 'N/A'}</p>
      </li>
    ))}
  </ul>
}