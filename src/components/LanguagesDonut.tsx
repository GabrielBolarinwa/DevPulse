import { useRepositoryLanguages } from "@/services/queries";
import { getLanguageColor } from "@/utlls";
import { useState } from "react";
import { Pie, PieChart, type PieSectorDataItem } from "recharts";

function LanguagesDonut() {
  const [activeSegment, setActiveSegment] = useState<PieSectorDataItem | null>(
    null,
  );
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const languages = useRepositoryLanguages().data;
  const languagesChartData = languages.map((language) => ({
    name: language.name,
    value: parseFloat(language.percentage),
    fill: getLanguageColor(language.name),
  }));
  const biggestLanguage = languagesChartData.reduce((max, obj) =>
    obj.value > max.value ? obj : max,
  );
  return (
    <div className="h-full w-full py-3 px-5">
      <h4 className="mb-4">Language Distribution</h4>
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-20 h-full">
        <div
          className="relative h-auto"
          aria-label="Language Distribution"
          role="img"
        >
          <PieChart
            width={200}
            height={200}
            responsive
            style={{ position: "relative" }}
          >
            <Pie
              data={languagesChartData}
              cx={"50%"}
              cy={"50%"}
              innerRadius={60}
              outerRadius={90}
              stroke="#1c2030"
              dataKey="value"
              nameKey="name"
              fill="#4d8ef0"
              startAngle={90}
              endAngle={-270}
              tabIndex={0}
              onMouseMove={(data, _, event) => {
                setActiveSegment(data);
                setTooltipPos({ x: event.clientX, y: event.clientY });
              }}
              onFocus={(data, _, event) => {
                setActiveSegment(data);
                setTooltipPos({
                  x: event.target.clientLeft,
                  y: event.target.clientTop,
                });
              }}
              onKeyDown={(data, _, event) => {
                setActiveSegment(data);
                setTooltipPos({
                  x: event.currentTarget.clientLeft,
                  y: event.currentTarget.clientTop,
                });
              }}
              onMouseLeave={() => setActiveSegment(null)}
            />
          </PieChart>
          {activeSegment && (
            <Tooltip activeSegment={activeSegment} tooltipPos={tooltipPos} />
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center top-[30%] left-1/2 -translate-x-1/2 h-max z-0">
            <span className="text-2xl font-bold text-text-primary">
              {biggestLanguage.value}%
            </span>
            <span className="text-xs text-text-secondary">
              {biggestLanguage.name}
            </span>
            <span className="text-xs text-text-muted truncate max-w-full">
              (Favourite Language)
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-wrap gap-2">
          {languagesChartData.map((entry, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="inline-flex gap-2 justify-center items-center">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: entry.fill }}
                />
                <div className="text-sm text-text-primary">{entry.name}</div>
              </div>
              <div className="text-sm text-text-secondary">{entry.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LanguagesDonut;
interface TooltipProps {
  tooltipPos: { x: number; y: number };
  activeSegment: PieSectorDataItem;
}

function Tooltip({ tooltipPos, activeSegment }: TooltipProps) {
  return (
    <div
      className="fixed bg-bg-elevated border border-subtle rounded-md px-3 py-2 text-xs text-text-primary pointer-events-none"
      style={{
        top: tooltipPos.y,
        left: tooltipPos.x,
        zIndex: 100,
        transform: "translate(10px,-50px)",
      }}
    >
      {activeSegment.name}: {activeSegment.value}%
    </div>
  );
}
