import { titleFont } from "@/components/config/fonts";

interface Props {
    title: string;
}

export const Title = ({ title }: Props) => {
    return (
        <h1 className={`
    ${titleFont.className}  flex justify-center text-2xl 
    `}>{title}</h1>
    )
}
