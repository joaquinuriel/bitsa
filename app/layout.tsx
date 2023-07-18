import "app/globals.css";
import { Footer } from "components/footer";
import { Metadata } from "next";
import { Mulish } from "next/font/google";

const font = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Prueba Tecnica",
	description: "Powered by Bitnovo",
};

// ReactDOM.prefetchDNS("https://payments.smsdata.com/");

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={font.className}>
				{children}
				<Footer />
			</body>
		</html>
	);
}
