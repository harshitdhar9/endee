"use client";
import React from 'react';

import DashboardNavbar from '../../../components/DashboardNavbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <DashboardNavbar />
      <main className="flex-grow p-10">{children}</main>
    </div>
  );
}
