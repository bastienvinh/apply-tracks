import { Card, CardContent } from "@/components/ui/card";
import { CompanyForm } from "@/features/companies/components/CompanyForm";

export function CreateCompany() {
  return <div className="w-full flex justify-center">
    <div className="w-1/2">
      <Card>
        <CardContent>
          <CompanyForm />
        </CardContent>
      </Card>
    </div>
  </div>
}