import { Card, CardContent } from "@/components/ui/card";
import { CompanyForm } from "@/features/companies/components/CompanyForm";
import { useCompany } from "@/features/companies/hooks/use-companies";
import { useParams } from "react-router";

export function UpdateCompany() {
  const { id } = useParams<{ id: string }>()
  const {data, error, isFetching, isLoading} = useCompany(id!)

  if (!isFetching) {
    console.log(data)
  }

  return <div className="w-full flex justify-center">
    <div className="w-1/2">
      <Card>
        <CardContent>
          <CompanyForm data={data} />
        </CardContent>
      </Card>
    </div>
  </div>
}