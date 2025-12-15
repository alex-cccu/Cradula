import Link from "next/link";
import Splodge from "@/assets/Splodge";
import Splodge2 from "@/assets/Splodge2";
import getAllPageLocations from "@/lib/pages/getAllPageLocations";
import BackArrow from "@/assets/BackArrow";

const Page = async ({ params }: { params: { slug: string } }) => {
  const loadedParams = await params;
  const { default: Post } = await import(
    `@/miscPages/${loadedParams.slug}.mdx`
  );

  return (
    <div className="relative min-h-[400px] w-screen overflow-x-hidden overflow-y-hidden">
      <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5 z-2">
        <div className="flex justify-between font-body">
          <Link
            href={"/"}
            className="group hover:scale-105 ease-in-out transition-transform duration-500 flex flex-row gap-1 place-items-center animate-appear-fast"
          >
            <BackArrow />
            <p>Back to safety</p>
          </Link>
        </div>
        <article className="article z-2 animate-appear">
          <Post />
        </article>
      </section>
      {/* <div className="z-0 absolute md:-right-[180px] -right-[300px] top-0 lg:top-1/6 animate-appear-slow">
        <Splodge />
      </div>
      <div className="bottom-0 z-0 absolute md:-left-[120px] -left-[200px] animate-appear-slow">
        <Splodge2 />
      </div> */}
    </div>
  );
};

export default Page;

export function generateStaticParams() {
  return getAllPageLocations();
}

export const dynamicParams = false;
