import { cn } from "@/utils/lib/cn"
import { ComponentProps, FC, ReactNode } from "react"

interface IButtonProps extends ComponentProps<"button"> {
	children: ReactNode
	className?: string
}

export const Button: FC<IButtonProps> = ({ children, ...props }) => {
	const { onClick, className, ...rest } = props
	return (
		<button
			className={cn("bg-blue-500 text-white p-2 w-full", className)}
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	)
}
