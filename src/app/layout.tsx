import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Suspense } from "react";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";

import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { ThemeProvider } from "./_components/theme-provider";

export const metadata: Metadata = {
	title: "GUC Empty Room Finder",
	description: "Find empty rooms at the German University in Cairo.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable}`}
			suppressHydrationWarning
		>
			<body>
				<TRPCReactProvider>
					<HydrateClient>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Header />
							<div className="flex flex-col min-h-screen bg-background-default">
								<main className="flex-grow flex justify-center w-screen p-4">
									<Suspense>{children}</Suspense>
								</main>
							</div>
							<Footer />
						</ThemeProvider>
					</HydrateClient>
					<Analytics />
				</TRPCReactProvider>
			</body>
		</html>
	);
}
