"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
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
}

export function DataTable({
  columns,
  data,
  onRowClick,
  searchPlaceholder = "Search...",
  itemsPerPage = 10,
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
  const paginatedData = filteredData.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  return (
    <div className='w-full space-y-4'>
      {/* Search Bar */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2' />
        <Input
          type='text'
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className='pl-10 border-gray-200'
        />
      </div>

      {/* Table */}
      <div className='rounded-lg border border-gray-200 overflow-hidden bg-white'>
        <table className='w-full'>
          <thead className='bg-gray-50 border-b border-gray-200'>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className='px-6 py-3 text-left text-xs font-semibold text-gray-600'
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
                className='border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer'
              >
                {columns.map((col) => (
                  <td key={col.key} className='px-6 py-4 text-sm text-gray-700'>
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
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-600'>
            Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length}
          </p>
          <div className='flex gap-2'>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className='p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50'
            >
              <ChevronLeft size={18} />
            </button>
            <span className='px-3 py-2 text-sm text-gray-600'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className='p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50'
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
