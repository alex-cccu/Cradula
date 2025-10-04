import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { getPageContent } from "@/lib/page";
import Splodge from "@/assets/Splodge";
import Splodge2 from "@/assets/Splodge2";

const Page = async ({ params }: { params: { slug: string } }) => {
  const loadedParams = await params;
  const pageContent = await getPageContent(loadedParams.slug);

  return (
    <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
      <div className="flex justify-between font-body">
        <Link
          href={"/"}
          className="group hover:scale-105 ease-in-out transition-transform duration-500 flex flex-row gap-1 place-items-center"
        >
          <ArrowLeftIcon
            width={20}
            className="stroke-cradula-green fill-cradula-green dark:stroke-cradula-red dark:fill-cradula-red group-hover:animate-back-bounce"
          />
          <p>Back to safety</p>
        </Link>
        {/* <p>{pageContent.date.toString()}</p> */}
      </div>
      <div className="z-0 absolute md:-right-[180px] -right-[300px] top-1/4 lg:top-1/6">
        <Splodge />
      </div>
      <article
        className="article z-1"
        dangerouslySetInnerHTML={{ __html: pageContent.contentHtml }}
      />
      <div className="-bottom-[600px] z-0 absolute md:-left-[120px] -left-[220px]">
        <Splodge2 />
      </div>
    </section>
  );
};

export default Page;
