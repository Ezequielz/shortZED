import { getLink } from "@/action";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
}

export default async function ({ params }: Props) {

    const { slug } = params;

    const link = await getLink(slug)
    console.log(link)
    // if (!link.ok) {
    //     notFound()
    // }

  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}