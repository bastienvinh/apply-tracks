import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { usePagination } from "@/hooks/use-pagination";

interface PaginationProps {
  totalPages: number;
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function Pagination({ totalPages, total, hasNextPage, hasPrevPage }: PaginationProps) {
  const { page, nextPage, prevPage } = usePagination({ defaultLimit: 10 });

  return <div className="flex items-center justify-between border-t pt-4 mt-4">
    <p className="text-sm text-muted-foreground">
      Page {page} sur {totalPages} • {total} éléments
    </p>
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => prevPage()}
        disabled={!hasPrevPage}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => nextPage()}
        disabled={!hasNextPage}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  </div>
}