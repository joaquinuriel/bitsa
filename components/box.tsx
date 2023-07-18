import { ComponentProps } from "react";

export function Box(props: ComponentProps<"div">) {
	return (
		<div
			className="mx-auto prose prose-p:m-0 prose-a:no-underline prose-p:text-darker prose-lead:font-bold"
			{...props}
		/>
	);
}
