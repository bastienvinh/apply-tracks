import { useIndustries } from "@/features/industries/hooks/use-industries";

export function Industries() {

  const { paginatedData, isLoading, error } = useIndustries({ page: 1, limit: 10 });

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading industries.</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Industries</h1>
      <p>
        Welcome to the Industries page. Here you can find information about various industries we serve.
      </p>
    </div>
  );
}