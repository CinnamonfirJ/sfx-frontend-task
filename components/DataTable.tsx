"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  extraColumns?: Column[];
}

export function DataTable({
  columns,
  data,
  onRowClick,
  searchPlaceholder = "Search...",
  itemsPerPage = 10,
  extraColumns = [],
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

  const allColumns = [...columns, ...extraColumns];

  return (
    <div className='space-y-4 w-full'>
      {/* Search Bar */}
      <div className='relative'>
        <Search className='top-1/2 left-3 absolute w-4 h-4 text-gray-400 dark:text-gray-400 -translate-y-1/2' />
        <Input
          type='text'
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className='dark:bg-[#1F1F1F] pl-10 border-gray-200 dark:border-gray-700 dark:text-gray-100'
        />
      </div>

      {/* Table */}
      <div className='bg-white dark:bg-[#1F1F1F] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 border-b'>
            <tr>
              {allColumns.map((col) => (
                <th
                  key={col.key}
                  className='px-6 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs text-left'
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick?.(row)}
                className='hover:bg-gray-50 dark:hover:bg-gray-900 border-gray-100 dark:border-gray-700 border-b transition-colors cursor-pointer'
              >
                {allColumns.map((col) => (
                  <td
                    key={col.key}
                    className='px-6 py-4 text-gray-700 dark:text-gray-200 text-sm whitespace-nowrap'
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-between items-center'>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>
            Showing {startIdx + 1} to{" "}
            {Math.min(startIdx + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length}
          </p>
          <div className='flex gap-2'>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className='hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-50 p-2 rounded-lg'
            >
              <ChevronLeft size={18} />
            </button>
            <span className='px-3 py-2 text-gray-600 dark:text-gray-400 text-sm'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className='hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-50 p-2 rounded-lg'
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
