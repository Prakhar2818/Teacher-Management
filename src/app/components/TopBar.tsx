export default function TopBar() {
  return (
    <header className="w-full h-14 bg-red-600 flex items-center justify-between px-6 shadow text-white">
      <div className="font-bold text-lg tracking-wide">Teacher Management</div>
      <div className="flex items-center gap-4">
        {/* Placeholder for user icons */}
        <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
          </svg>
        </span>
      </div>
    </header>
  );
}
