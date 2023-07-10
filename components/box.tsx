import { ComponentProps } from "react";

export function Box(props: ComponentProps<"div">) {
	return (
		<div
			className="prose dark:prose-invert prose-p:m-0 prose-a:no-underline"
			{...props}
		/>
	);
}
