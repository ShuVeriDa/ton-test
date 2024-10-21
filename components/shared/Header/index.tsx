"use client"

import { useDisconnectWallet } from "@/utils/hooks/useLocalStorage"
import { useWallet } from "@/utils/hooks/useWallet"
import { useTonConnectUI } from "@tonconnect/ui-react"
import { usePathname, useRouter } from "next/navigation"
import { FC } from "react"

interface IHeaderProps {}

export const Header: FC<IHeaderProps> = () => {
	const [tonConnectUI] = useTonConnectUI()
	const { balance, wallet } = useWallet(true)
	const { push } = useRouter()
	const pathName = usePathname()
	const { handleDisconnect } = useDisconnectWallet()

	const buttonHandler = () => {
		if (pathName === "/wallet") {
			if (!tonConnectUI.connected) {
				tonConnectUI.openSingleWalletModal("tonkeeper")
			} else {
				handleDisconnect()
			}
		}
		if (pathName === "/transaction") {
			push("/wallet")
		}
	}

	const title = !tonConnectUI?.connected
		? "Подключить Tonkeeper"
		: "Отключить Tonkeeper"

	const buttonTitle = pathName === "/wallet" ? title : "Назад"

	return (
		<header className="w-full flex justify-between items-center p-4 bg-blue-500 text-white">
			<button onClick={buttonHandler}>{buttonTitle}</button>
			{balance && wallet && <h1 className="text-lg">Balance: {balance}</h1>}
		</header>
	)
}
