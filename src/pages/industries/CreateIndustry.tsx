import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IndustryForm } from "@/features/industries/components/IndustryForm";

export function CreateIndustry() {
  return <div className="w-full flex justify-center">
    <div className="w-1/2">
      <Card>
        <CardContent>
          <IndustryForm />
        </CardContent>
      </Card>
    </div>
  </div>
}