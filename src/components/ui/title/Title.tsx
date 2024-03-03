import { titleFont } from "@/components/config/fonts";

interface Props {
    title: string;
}

export const Title = ({ title }: Props) => {
    return (
        <h1 className={`
    before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-white before:bottom-0 before:left-0 before:z-10
    after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-white after:bottom-0 after:right-0 after:z-10
    ${titleFont.className}  flex justify-center text-2xl 
    `}>{title}</h1>
    )
}
