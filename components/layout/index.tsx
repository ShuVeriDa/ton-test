"use client"

import { TonConnectUIProvider } from "@tonconnect/ui-react"
import { FC, ReactNode } from "react"
import { Header } from "../shared/Header"

interface ILayoutProps {
	children: ReactNode
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<div className="flex min-h-screen w-full flex-col gap-5 justify-start">
			<TonConnectUIProvider manifestUrl={process.env.NEXT_PUBLIC_MANIFEST_URL}>
				<Header />
				{children}
			</TonConnectUIProvider>
		</div>
	)
}
