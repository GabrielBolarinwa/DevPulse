import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ChartLoader from "./ChartLoader";
import CommitsBarChart from "./CommitsBarChart";
import ErrorCard from "./ErrorCard";
import ForksReposList from "./ForksReposList";
import Heatmap from "./Heatmap";
import LanguageBarChart from "./LanguageBarChart";
import LanguagesDonut from "./LanguagesDonut";
import StarsReposList from "./StarsReposList";
function DashboardGrid() {
  return (
    <div className="grid grid-cols-6 gap-6 mt-12">
      <div className="col-span-6 lg:col-span-3">
        <ErrorBoundary fallback={<ErrorCard />}>
          <Suspense fallback={<ChartLoader />}>
            <div className="bg-bg-elevated p-5 pl-0 flex flex-col justify-center rounded-2xl ">
              <CommitsBarChart />
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="col-span-6 lg:col-span-3 ">
        <ErrorBoundary fallback={<ErrorCard />}>
          <Suspense fallback={<ChartLoader />}>
            <div className="bg-bg-elevated p-5 pl-0 flex justify-center items-center rounded-2xl h-full">
              <LanguagesDonut />
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="col-span-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6">
          <ErrorBoundary fallback={<ErrorCard />}>
            <Suspense fallback={<ChartLoader />}>
              <div className="bg-bg-elevated p-5 pl-0 flex flex-col justify-center rounded-2xl h-full">
                <LanguageBarChart />
              </div>
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <ErrorBoundary fallback={<ErrorCard />}>
            <Suspense fallback={<ChartLoader />}>
              <div className="bg-bg-elevated p-5 pl-0 flex justify-center items-center rounded-2xl h-full">
                <StarsReposList />
              </div>
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <ErrorBoundary fallback={<ErrorCard />}>
            <Suspense fallback={<ChartLoader />}>
              <div className="bg-bg-elevated p-5 pl-0 flex justify-center items-center rounded-2xl h-full">
                <ForksReposList />
              </div>
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="col-span-12">
          <ErrorBoundary fallback={<ErrorCard />}>
            <Suspense fallback={<ChartLoader />}>
              <div className="bg-bg-elevated p-5 flex flex-col justify-center rounded-2xl h-full">
                <Heatmap />
              </div>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default DashboardGrid;
