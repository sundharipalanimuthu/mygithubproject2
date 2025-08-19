'use client';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end space-x-2 py-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          className={`w-9 h-9 rounded-full text-sm font-semibold ${
            currentPage === num
              ? 'bg-pink-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
