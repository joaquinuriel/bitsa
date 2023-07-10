"use client";

import { CheckCircleIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { ComponentProps, useState } from "react";

export function Copy({ children, ...props }: ComponentProps<"p">) {
	const [copied, setCopied] = useState(false);
	return (
		<span
			{...props}
			className="flex items-center gap-2 break-all cursor-pointer"
			onClick={() => {
				navigator.clipboard.writeText(children?.toString() ?? "").then(() => {
					setCopied(true);
					const timeout = setTimeout(() => {
						setCopied(false);
						clearTimeout(timeout);
					}, 1000);
				});
			}}
		>
			{children}
			{copied ? (
				<CheckCircleIcon className="w-4 h-4 text-green-500" />
			) : (
				<ClipboardIcon className="w-4 h-4 text-blue-500" />
			)}
		</span>
	);
}
