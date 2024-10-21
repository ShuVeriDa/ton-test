"use client"

import { Button } from "@/components/shared/Button"
import { Input } from "@/components/shared/Input"
import { useWallet } from "@/utils/hooks/useWallet"
import { cn } from "@/utils/lib/cn"
import { CHAIN, useTonConnectUI } from "@tonconnect/ui-react"
import { NextPage } from "next"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"

interface ITransactionProps {}

const Transaction: NextPage<ITransactionProps> = () => {
	const [amount, setAmount] = useState("")
	const [recipient, setRecipient] = useState("")
	const [disabled, setDisabled] = useState(false)

	const [tonConnectUI] = useTonConnectUI()
	const { wallet } = useWallet()
	const { push } = useRouter()

	useEffect(() => {
		if (!wallet) {
			push("/wallet")
		}
	}, [wallet])

	const onChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(e.currentTarget.value)
	}

	const onChangeRecipient = (e: ChangeEvent<HTMLInputElement>) => {
		setRecipient(e.currentTarget.value)
	}

	const transaction = {
		validUntil: Date.now() + 5 * 60 * 1000,
		messages: [
			{
				address: recipient,
				amount: Math.round(parseFloat(amount) * 1000000000).toString(),
			},
		],
		network: CHAIN.TESTNET,
	}

	const handleTransaction = () => {
		if (amount && recipient) {
			tonConnectUI
				.sendTransaction(transaction)
				.then(() => {
					alert(
						`Транзакция успешно обработана! Отправлено ${amount} TON на адрес ${recipient}`
					)
					setAmount("")
					setRecipient("")
				})
				.catch(() => {
					alert("Ошибка при обработке транзакции.")
				})
		} else {
			alert("Заполните все поля!")
		}
	}

	useEffect(() => {
		if (amount && recipient) {
			setDisabled(false)
		} else {
			setDisabled(true)
		}
	}, [amount, recipient])

	return (
		<div className=" w-full flex flex-col items-center gap-5 px-4">
			<h1 className="text-2xl font-bold">Транзакция</h1>
			<div>
				<Input
					type="number"
					placeholder="Сумма TON"
					value={amount}
					onChange={onChangeAmount}
				/>
				<Input
					type="text"
					placeholder="Адрес получателя"
					value={recipient}
					onChange={onChangeRecipient}
				/>
				<Button
					onClick={handleTransaction}
					disabled={disabled}
					className={cn(disabled && "opacity-50")}
				>
					Отправить
				</Button>
			</div>
		</div>
	)
}
export default Transaction
