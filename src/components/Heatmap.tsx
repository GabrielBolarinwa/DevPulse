import { useHeatmapData } from "@/services/queries";
import { dateFormat } from "@/utlls";
import React, { type ReactElement, type ReactSVGElement } from "react";
import CalendarHeatmap, { type TooltipDataAttrs } from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";

function Heatmap() {
  const heatmapData = useHeatmapData().data;
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  return (
    <>
      <h4>Contribution Heatmap</h4>
      <div className="overflow-x-auto mt-6">
        <div
          className="min-w-150 w-[80%] mx-auto"
          aria-label="Contribution Activity over the past year"
        >
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={heatmapData}
            classForValue={(value) => {
              if (!value || value.count === 0) return "color-empty";
              if (value.count <= 2) return "color-scale-1";
              if (value.count <= 5) return "color-scale-2";
              if (value.count <= 9) return "color-scale-3";
              return "color-scale-4";
            }}
            tooltipDataAttrs={(value) =>
              ({
                "data-tooltip-id": "heatmap-tooltip",
                "data-tooltip-content": value?.count
                  ? `${value.count} contributions on ${dateFormat(new Date(value.date))}`
                  : "No contributions",
              }) as unknown as TooltipDataAttrs
            }
            showMonthLabels={true}
            transformDayElement={(element, value) =>
              React.cloneElement(element as ReactElement as ReactSVGElement, {
                role: "img",
                tabIndex: 0,
                "aria-label": value?.count
                  ? `${value.count} contributions on ${dateFormat(new Date(value.date))}`
                  : "No contributions",
              })
            }
          />

          <Tooltip
            id="heatmap-tooltip"
            className="bg-bg-elevated text-text-primary text-xs border-border-subtle"
          />
        </div>
      </div>
    </>
  );
}

export default Heatmap;
