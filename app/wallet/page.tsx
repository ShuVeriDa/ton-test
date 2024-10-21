"use client"

import { Button } from "@/components/shared/Button"
import { useWallet } from "@/utils/hooks/useWallet"
import { NextPage } from "next"
import { useRouter } from "next/navigation"

interface IWalletProps {}

const Wallet: NextPage<IWalletProps> = () => {
	const { address, wallet } = useWallet()
	const { push } = useRouter()

	const navigateToTransaction = () => {
		push("/transaction")
	}

	return (
		<div className="w-full flex flex-col px-4">
			{wallet ? (
				<div className="w-full flex flex-col gap-5">
					<div>
						<p className="text-[20px] font-bold">
							Адрес кошелька: &nbsp;
							<span className="text-[16px] font-normal">{address}</span>
						</p>
					</div>
					<div className="w-full flex justify-center">
						<Button onClick={navigateToTransaction}>Transact</Button>
					</div>
				</div>
			) : (
				<p>Подключите кошелёк через TonKeeper</p>
			)}
		</div>
	)
}
export default Wallet
