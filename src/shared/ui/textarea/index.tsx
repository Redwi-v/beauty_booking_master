'use client'
import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from "react";
import s from './textarea.module.scss'
import cssIf from "@/scripts/helpers/class.add.if";

interface ITextAreaProps {
	textAreaParams: DetailedHTMLProps<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	>;
	className?: string;
	label?: string;
	isRequired?: boolean;
	value?: string;
	setValue?: (value: string) => void;
}

export const Textarea: FC<ITextAreaProps> = props => {
	const {
		textAreaParams: TextAreaParasProps,
		className,
		label,
		isRequired,
		setValue,
		value,
	} = props;

	const { className: textAreaClassName, ...textAreaParams } = TextAreaParasProps;

	return (
		<label className={`${s.wrapper} ${cssIf(!!className, className)}`}>
			{label && (
				<span className={s.label}>
					{label} {isRequired && <span>*</span>}
				</span>
			)}

			<textarea
				className={`${s.textArea} ${cssIf(!!textAreaClassName, textAreaClassName)}`}
				{...textAreaParams}
				value={value}
				onChange={e => setValue?.(e.target.value)}
			/>
		</label>
	);
};
 