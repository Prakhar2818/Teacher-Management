"use client";
import React from "react";
import Link from "next/link";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-opacity-40 z-40 transition-opacity md:hidden ${
          open ? "block" : "hidden"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed md:static top-0 left-0 h-full w-60 flex flex-col py-6 px-4 shadow-lg z-50 transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "var(--sidebar-bg)", color: "var(--sidebar-text)" }}
      >
        <div
          className="mb-8 text-xl font-bold tracking-wide flex items-center justify-between"
          style={{ color: "var(--sidebar-text)" }}
        >
          Menu
          <button
            className="md:hidden text-2xl ml-2"
            style={{ color: "var(--sidebar-text)" }}
            onClick={onClose}
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>
        <nav className="flex-1 space-y-2">
          <Link
            href="/"
            className="block py-2 px-3 rounded font-semibold hover:bg-blue-800"
            style={{ color: "var(--sidebar-text)" }}
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            href="/new"
            className="block py-2 px-3 rounded hover:bg-blue-800"
            style={{ color: "var(--sidebar-text)" }}
            onClick={onClose}
          >
            Add Teacher
          </Link>
          <Link
            href="/teachers"
            className="block py-2 px-3 rounded hover:bg-blue-800"
            style={{ color: "var(--sidebar-text)" }}
            onClick={onClose}
          >
            All Teachers
          </Link>
          <Link
            href="/logs"
            className="block py-2 px-3 rounded hover:bg-blue-800"
            style={{ color: "var(--sidebar-text)" }}
            onClick={onClose}
          >
            Activity Logs
          </Link>
        </nav>
      </aside>
    </>
  );
}
