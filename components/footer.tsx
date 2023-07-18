import Image from "next/image";
import powered from "public/powered.png";

export function Footer() {
	return (
		<footer className="flex justify-center gap-2 py-10">
			<Image
				alt="Powered by bitnovo"
				src={powered}
				className="object-contain"
				width={164}
				height={26}
			/>
		</footer>
	);
}
