import { useTonConnectUI } from "@tonconnect/ui-react"

const keys = [
	"ton-connect-ui_last-selected-wallet-info",
	"ton-connect-storage_bridge-connection",
	"ton-connect-ui_wallet-info",
	"ton-connect-ui_preferred-wallet",
]

export const useDisconnectWallet = () => {
	const [tonConnectUI] = useTonConnectUI() // инициализация SDK

	const handleDisconnect = async () => {
		if (tonConnectUI) {
			await tonConnectUI.disconnect()
		}

		keys.forEach(key => {
			localStorage.removeItem(key)
		})
	}
	return {
		handleDisconnect,
	}
}
