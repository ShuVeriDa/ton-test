import { ComponentProps, FC } from "react"

interface IInputProps extends ComponentProps<"input"> {}

export const Input: FC<IInputProps> = props => {
	const { type, placeholder, value, onChange, ...rest } = props
	return (
		<input
			type={type}
			placeholder={placeholder}
			className="border p-2 w-full mb-4 outline-none text-neutral-900"
			value={value}
			onChange={onChange}
			{...rest}
		/>
	)
}
