import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type FC, useMemo } from "react";
import { ErrorMessage, NoDataMessage } from "@/components/common/empty-states";
import { useAccounts, useTransactions } from "@/hooks/budget";
import type { Account, Transaction } from "@/lib/api/budget/types";
import { formatMoney } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../base/table";
import { SmartDate } from "../common/smart-time";

export const ActivityFeed: FC = () => {
  const {
    transactions,
    isError: transactionsError,
    isLoading: transactionsLoading,
    error: transactionsErrorObj,
  } = useTransactions();
  const {
    accounts,
    isError: accountsError,
    isLoading: accountsLoading,
    error: accountsErrorObj,
  } = useAccounts();
  const accountsMap = useMemo<Record<string, Account>>(
    () =>
      accounts
        ? Object.fromEntries(accounts.map((acct) => [acct.id, acct]))
        : {},
    [accounts],
  );

  const isLoading = transactionsLoading || accountsLoading;
  const isError = transactionsError || accountsError;
  const error = transactionsErrorObj || accountsErrorObj;

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "merchant",
      header: "Merchant",
      cell: (data) => (
        <p style={{ fontWeight: "bold" }}>{data.row.original.merchant}</p>
      ),
    },
    {
      header: "Amount",
      accessorFn: (acct) => `$${acct.amount}`,
      cell: (data) => (
        <p style={{ fontWeight: "bold" }}>
          {formatMoney(data.row.original.amount)}
        </p>
      ),
    },
    {
      accessorKey: "categoryLabel",
      header: "Category",
    },
    {
      header: "Account",
      accessorFn: (data) => accountsMap[data.accountId]?.name ?? "-",
      enableSorting: true,
    },
    {
      accessorKey: "authorizedDate",
      header: "Date",
      cell: (data) => (
        <SmartDate date={data.row.original.authorizedDate} showTooltip />
      ),
      enableSorting: true,
    },
  ];

  const table = useReactTable({
    data: (transactions ?? []).sort((a, b) =>
      a.authorizedDate > b.authorizedDate ? -1 : 1,
    ),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {transactions?.length ? (
        <div className="overflow-hidden rounded-md border p-2">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : isLoading ? (
        <p>loading</p>
      ) : isError ? (
        <ErrorMessage message={error?.message} />
      ) : (
        <NoDataMessage />
      )}
    </div>
  );
};
