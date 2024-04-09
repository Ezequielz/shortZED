import { titleFont } from "@/components/config/fonts";

interface Props {
    title: string;
    className?: string;
}

export const Title = ({ title, className }: Props) => {
    return (
        <h1 className={`
    ${titleFont.className}  flex justify-center text-2xl ${className}
    `}>{title}</h1>
    )
}
