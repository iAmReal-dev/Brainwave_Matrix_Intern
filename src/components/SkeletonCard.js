import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
}