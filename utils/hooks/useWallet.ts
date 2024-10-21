"use client"

import { useTonAddress, useTonWallet } from "@tonconnect/ui-react"
import { useEffect, useState } from "react"
import TonWeb from "tonweb"

export const useWallet = (isFetchBalance?: boolean) => {
	const wallet = useTonWallet()
	const address = useTonAddress()
	const [balance, setBalance] = useState<string>("Loading...")

	const tonweb = new TonWeb(
		new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC")
	)

	useEffect(() => {
		if (address && isFetchBalance) {
			const fetchBalance = async () => {
				try {
					const result = await tonweb.getBalance(address)
					const tonBalance = TonWeb.utils.fromNano(result)
					setBalance(`${tonBalance} TON`)
				} catch (error) {
					console.error("Ошибка при получении баланса:", error)
					setBalance("Ошибка при получении баланса")
				}
			}

			fetchBalance()
		}
	}, [address, isFetchBalance])

	return {
		balance,
		wallet,
		address,
	}
}
