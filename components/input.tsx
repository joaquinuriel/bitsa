import { ComponentProps } from "react";

const LabeledInput = ({
	label,
	...rest
}: ComponentProps<"input"> & { label: string }) => {
	return (
		<div className="flex flex-col">
			<input className="border border-gray-300 rounded p-2 pl-10" {...rest} />
			<label
				htmlFor={rest.id}
				className="absolute top-0 right-0 flex items-center justify-center h-full px-3 text-gray-600"
			>
				{label}
			</label>
		</div>
	);
};

export default LabeledInput;
