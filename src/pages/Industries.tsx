import { Button } from "@/components/ui/button";
import { useIndustries } from "@/features/industries/hooks/use-industries";
import { usePagination } from "@/hooks/use-pagination";

export function Industries() {

  const { page, limit, nextPage, prevPage } = usePagination({ defaultLimit: 10 });
  const { paginatedData, isLoading, error } = useIndustries({ page, limit });

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading industries.</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Industries</h1>
      <ul>
        {paginatedData?.data.map((industry) => (
          <li key={industry.id}>{industry.name}</li>
        ))}
      </ul>
      <p>
        Welcome to the Industries page. Here you can find information about various industries we serve.
      </p>
      <Button onClick={() => nextPage()}>Next Page</Button>
    </div>
  );
}