import Navigation from "@/components/navigation";
import DashboardGrid from "@/components/dashboard-grid";

export default function Portfolio() {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navigation />
      <main className="flex-1 min-h-0 p-4 lg:p-6 overflow-y-auto lg:overflow-hidden">
        <DashboardGrid />
      </main>
    </div>
  );
}
