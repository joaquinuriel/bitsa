import { ComponentProps } from "react";

export function Main({ children }: ComponentProps<"main">) {
	return (
		<main className="flex p-8 sm:p-24">
			{children}
		</main>
	);
}
