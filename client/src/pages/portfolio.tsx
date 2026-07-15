import Navigation from "@/components/navigation";
import DashboardGrid from "@/components/dashboard-grid";

export default function Portfolio() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200 overflow-x-hidden">
      <Navigation />
      <main className="flex-1 min-h-0 px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6 overflow-y-auto overflow-x-hidden">
        <DashboardGrid />
      </main>
    </div>
  );
}
