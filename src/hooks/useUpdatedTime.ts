import { now } from "@/utils";
import { useMemo } from "react";

export function useUpdatedTime(updateTime: number): string | undefined {
	const date = useMemo(() => now(), []);
	console.log(updateTime, date);
	const seconds = (Number(new Date(updateTime)) - date) / 1000;
	if (Math.abs(seconds) < 30) return "just now";
	const units: [Intl.RelativeTimeFormatUnit, number][] = [
		["year", 60 * 60 * 24 * 365],
		["month", 60 * 60 * 24 * 30.44],
		["week", 60 * 60 * 24 * 7],
		["day", 60 * 60 * 24],
		["hour", 60 * 60],
		["minute", 60],
		["second", 1],
	];
	const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
	for (const [unit, secondsInUnit] of units) {
		if (Math.abs(seconds) >= secondsInUnit || unit === "second") {
			return rtf.format(Math.round(seconds / secondsInUnit), unit);
		}
	}
}
