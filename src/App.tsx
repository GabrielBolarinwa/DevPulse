import { Suspense } from "react";
import Header from "./components/Header";
import StatCardRowSkeleton from "./components/StatCardRowSkeleton";
import StatusCards from "./components/StatusCards";
import DashboardGrid from "./components/DashboardGrid";
import Footer from "./components/Footer";
import ErrorCard from "./components/ErrorCard";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <>
      <Header />
      <main className="px-6 mt-7">
        <ErrorBoundary fallback={<ErrorCard />}>
          <Suspense fallback={<StatCardRowSkeleton />}>
            <StatusCards />
          </Suspense>
        </ErrorBoundary>
        <DashboardGrid />
      </main>
      <Footer />
    </>
  );
}

export default App;
