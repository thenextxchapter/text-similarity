import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toast";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
		<html
			lang="en"
			className={cn(
				"bg-white text-slate-900 antialiased",
				inter.className
			)}
		>
			<body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">
				<noscript
					dangerouslySetInnerHTML={{
						__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WQXWZFD" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
					}}
				></noscript>
				<Providers>
					{/* @ts-expect-error Server Component */}
					<Navbar />
					<Toaster position="bottom-right" />

					<main>{children}</main>
				</Providers>

				{/* Allow more height for mobile menu on mobile */}
				<div className="h-40 md:hidden" />
			</body>
		</html>
  );
}
