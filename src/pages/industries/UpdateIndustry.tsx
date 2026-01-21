import { Card, CardContent } from "@/components/ui/card";
import { IndustryForm } from "@/features/industries/components/IndustryForm";
import { useIndustry } from "@/features/industries/hooks/use-industries";
import { useParams } from "react-router";

export function UpdateIndustry() {
  const { id } = useParams<{ id: string }>()
  const { data } = useIndustry(id!)

  console.log(data)

  return <div className="w-full flex justify-center">
    <div className="w-1/2">
      <Card>
        <CardContent>
          <IndustryForm data={data} />
        </CardContent>
      </Card>
    </div>
  </div>
}