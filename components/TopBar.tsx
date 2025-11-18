import Link from "next/link";

export default function Topbar() {
  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-pulseGreen/90 to-pulseGreen/60 flex items-center justify-center text-white font-bold">
            P
          </div>
          <div>
            <div className="text-sm font-semibold">Pulse</div>
            <div className="text-xs text-gray-500">Executive Insight Loop</div>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm  hover:text-gray-500">
            Home
          </Link>
          <Link href="/insights" className="text-sm hover:text-gray-500">
            Insights
          </Link>
        </nav>
      </div>
    </header>
  );
}
