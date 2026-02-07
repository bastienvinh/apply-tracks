"use client"

import { MoreVertical, Pen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"

import { Industry } from "@/services/industries"
import { Link } from "react-router"
import { updateIndustryRoute } from "@/routes"

interface IndustriesTableProps {
  data: Industry[]
  onDelete?: (industry: string) => void
}

const createColumns = (onDelete?: (industry: string) => void): ColumnDef<Industry>[] => [
  {
    accessorKey: "id",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Titre",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const industry = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir le menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                asChild
              >
                <Link to={updateIndustryRoute(industry.id)}>
                  <Pen className="mr-2 h-4 w-4" />
                  Modifier
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete?.(industry.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

export function IndustriesTable({ data, onDelete }: IndustriesTableProps) {
  const columns = createColumns(onDelete)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Aucune industrie trouvée.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}