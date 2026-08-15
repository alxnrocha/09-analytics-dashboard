import { useState, useMemo, type FC } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import type { TopProductItem } from '../../utils/metrics';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { ArrowUpDown, ArrowUp, ArrowDown, Package } from 'lucide-react';

interface TopProductsTableProps {
  products: TopProductItem[];
  isLoading?: boolean;
}

export const TopProductsTable: FC<TopProductsTableProps> = ({ products, isLoading = false }) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'revenue', desc: true }]);

  const columns = useMemo<ColumnDef<TopProductItem>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Producto',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-3">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-8 w-8 shrink-0 rounded-xl object-cover ring-1 ring-slate-100"
                />
              ) : (
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400"
                  aria-hidden="true"
                >
                  <Package className="h-4 w-4" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-900 line-clamp-1">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-400">{item.category}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'unitsSold',
        header: 'Ventas',
        cell: ({ getValue }) => (
          <span className="text-xs font-medium text-slate-500">
            {formatNumber(getValue<number>())}
          </span>
        ),
      },
      {
        accessorKey: 'revenue',
        header: 'Ingresos',
        cell: ({ row, getValue }) => {
          const isHot = row.original.isHot;
          return (
            <div className="flex items-center justify-end gap-1.5 font-bold text-slate-900 text-xs">
              <span>{formatCurrency(getValue<number>())}</span>
              {isHot && (
                <span title="Producto estrella" aria-label="Producto estrella">
                  🔥
                </span>
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return (
      <div
        role="status"
        aria-label="Cargando tabla de productos..."
        className="flex h-full min-h-[300px] flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-xs"
      >
        <div className="h-6 w-44 animate-pulse rounded-lg bg-slate-100" />
        <div className="mt-6 flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 animate-pulse rounded-xl bg-slate-50" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Productos destacados"
      className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-xs"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">Productos destacados</h3>
        <button
          type="button"
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg px-1.5 py-0.5"
          aria-label="Ver todos los productos"
        >
          Ver todos
        </button>
      </div>

      {/* Table */}
      {products.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-8 text-center text-xs text-slate-400">
          No hay productos disponibles para mostrar.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <caption className="sr-only">
              Tabla de productos más destacados ordenada por ingresos y ventas
            </caption>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-slate-100">
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const isSorted = header.column.getIsSorted();
                    const sortDirection =
                      isSorted === 'asc'
                        ? 'ascending'
                        : isSorted === 'desc'
                          ? 'descending'
                          : 'none';

                    return (
                      <th
                        key={header.id}
                        scope="col"
                        aria-sort={canSort ? sortDirection : undefined}
                        className={`pb-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 select-none ${
                          header.id === 'revenue' ? 'text-right' : ''
                        }`}
                      >
                        {canSort ? (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className={`inline-flex items-center gap-1 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 py-0.5 ${
                              header.id === 'revenue' ? 'justify-end w-full' : ''
                            }`}
                            aria-label={`Ordenar por ${header.column.columnDef.header as string}`}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <span className="text-slate-400" aria-hidden="true">
                              {isSorted === 'asc' ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : isSorted === 'desc' ? (
                                <ArrowDown className="h-3 w-3" />
                              ) : (
                                <ArrowUpDown className="h-3 w-3 opacity-40" />
                              )}
                            </span>
                          </button>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-50">
              {table
                .getRowModel()
                .rows.slice(0, 5)
                .map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-slate-50/70">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`py-2.5 ${cell.column.id === 'revenue' ? 'text-right' : ''}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
