import { lazy, Suspense, useEffect, useState } from "react";
import Navigation, { type ViewMode } from "@/components/navigation";
import WelcomeView from "@/components/welcome-view";

const DashboardGrid = lazy(() => import("@/components/dashboard-grid"));
const TimelineView = lazy(() => import("@/components/timeline-view"));
const TheatreView = lazy(() => import("@/components/theatre-view"));
const PhotoGallery = lazy(() => import("@/components/photo-gallery"));

const VIEW_STORAGE_KEY = "portfolio-view";

export default function Portfolio() {
  const [view, setView] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "welcome";
    return (localStorage.getItem(VIEW_STORAGE_KEY) as ViewMode) || "welcome";
  });

  useEffect(() => {
    localStorage.setItem(VIEW_STORAGE_KEY, view);
  }, [view]);

  if (view === "welcome") {
    return <WelcomeView onSelect={setView} />;
  }

  const isTheatre = view === "theatre";

  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden ${isTheatre ? "bg-black" : "bg-gray-200"}`}>
      <Navigation view={view} onViewChange={setView} />
      <main
        className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden ${
          isTheatre ? "" : "px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6"
        }`}
      >
        <Suspense fallback={null}>
          {view === "dashboard" && <DashboardGrid />}
          {view === "timeline" && <TimelineView />}
          {view === "theatre" && <TheatreView />}
          {view === "gallery" && <PhotoGallery />}
        </Suspense>
      </main>
    </div>
  );
}
