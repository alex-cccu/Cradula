import LoadingImage from "@/components/Loading/LoadingImage";
import LoadingTextBlock from "@/components/Loading/LoadingTextBlock";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const MiscLoading = () => {
  return (
    <div className="relative overflow-x-hidden overflow-y-hidden w-screen opacity-70">
      <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
        <div className="flex justify-between font-body place-items-center">
          <Link
            href={"/"}
            className="group hover:scale-105 ease-in-out transition-transform duration-500 flex flex-row gap-1 place-items-center"
          >
            <ArrowLeftIcon
              width={20}
              className="opacity-100 stroke-cradula-green fill-cradula-green dark:stroke-cradula-red dark:fill-cradula-red group-hover:animate-back-bounce"
            />
            <p className="opacity-100">Back to safety</p>
          </Link>
        </div>
        <div className="article">
          <div className="mx-auto animate-pulse content-center h-5 bg-cradula-purple rounded-full dark:bg-cradula-red w-7/10 mb-4"></div>
          <LoadingImage />
          <div className="animate-pulse h-3.5 bg-cradula-purple rounded-full dark:bg-cradula-red w-1/2 mb-2"></div>
          <LoadingTextBlock />
        </div>
      </section>
    </div>
  );
};

export default MiscLoading;
