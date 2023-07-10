"use client";

import { ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Clock({ expiration }: { expiration: string }) {
	const [time, setTime] = useState(Date.parse(expiration) - Date.now());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(Date.parse(expiration) - Date.now());
		}, 1000);
		return () => clearInterval(interval);
	}, [expiration]);

	const minutes = Math.floor(time / 60000)
		.toFixed(0)
		.padStart(2, "0");
	const seconds = Math.floor((time % 60000) / 1000)
		.toFixed(0)
		.padStart(2, "0");

	if (time <= 0)
		return (
			<span className="flex items-center gap-2">
				<ClockIcon className="w-4 h-4" />
				00:00
				<Link href="/" className="link">
					Reiniciar
				</Link>
			</span>
		);

	return (
		<span className="flex items-center gap-2">
			<ClockIcon className="w-4 h-4" />
			{minutes}:{seconds}
		</span>
	);
}
