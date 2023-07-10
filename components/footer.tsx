import Image from "next/image";
import powered from "public/powered.png";

export function Footer() {
	return (
		<footer className="fixed inset-0 top-auto flex justify-center gap-2 py-2 backdrop-blur">
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
