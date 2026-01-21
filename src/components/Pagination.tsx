import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { usePagination } from "@/hooks/use-pagination";

interface PaginationProps {
  totalPages: number;
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function Pagination({ totalPages, total, hasNextPage, hasPrevPage }: PaginationProps) {
  const { page, limit, nextPage, prevPage, setLimit } = usePagination({ defaultLimit: 10 });

  return <div className="flex items-center justify-between border-t pt-4 mt-4">
    <p className="text-sm text-muted-foreground">
      Page {page} sur {totalPages} • {total} éléments
    </p>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Par page:</span>
        <Select value={String(limit)} onValueChange={(value) => setLimit(Number(value))}>
          <SelectTrigger className="w-17.5 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
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
  </div>
}