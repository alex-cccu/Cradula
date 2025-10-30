import BackArrow from "@/assets/BackArrow";
import LoadingTextBlock from "@/components/Loading/LoadingTextBlock";
import Link from "next/link";

const CategoryLoading = () => {
  return (
    <div className="relative overflow-x-hidden overflow-y-hidden w-screen opacity-70">
      <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
        <div className="flex justify-between font-body place-items-center mb-4">
          <Link
            href={"/"}
            className="group hover:scale-105 ease-in-out transition-transform duration-500 flex flex-row gap-1 place-items-center"
          >
            <BackArrow />
            <p className="opacity-100">Back to safety</p>
          </Link>
        </div>
        <div className="">
          <div className="mx-auto animate-pulse content-center h-5 bg-cradula-green rounded-full dark:bg-cradula-red w-7/10 mb-6"></div>
          <div className="w-[40%] mx-auto mb-20">
            <LoadingTextBlock />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryLoading;
