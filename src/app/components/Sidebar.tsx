import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="h-full w-60 bg-gray-900 text-gray-100 flex flex-col py-6 px-4 shadow-lg">
      <div className="mb-8 text-xl font-bold tracking-wide text-white">
        Menu
      </div>
      <nav className="flex-1 space-y-2">
        <Link
          href="/"
          className="block py-2 px-3 rounded hover:bg-gray-800 font-semibold"
        >
          Home
        </Link>
        <Link href="/new" className="block py-2 px-3 rounded hover:bg-gray-800">
          Add Teacher
        </Link>
        <Link
          href="/teachers"
          className="block py-2 px-3 rounded hover:bg-gray-800"
        >
          All Teachers
        </Link>
        <Link
          href="/logs"
          className="block py-2 px-3 rounded hover:bg-gray-800"
        >
          Activity Logs
        </Link>
      </nav>
    </aside>
  );
}
