import { ComponentProps } from "react";

export function Main({ children }: ComponentProps<"main">) {
	return (
		<main className="flex flex-wrap content-center justify-center min-h-screen gap-8 p-8 sm:p-24">
			{children}
		</main>
	);
}
