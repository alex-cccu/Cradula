import BackArrow from "@/assets/BackArrow";
import Splodge from "@/assets/Splodge";
import Splodge2 from "@/assets/Splodge2";
import Link from "next/link";

const FourZeroFour = () => {
  return (
    <div className="relative overflow-x-hidden overflow-y-hidden min-h-svh w-screen animate-appear">
      <section className="flex min-h-svh">
        <div className="m-auto text-center z-2">
          <h1 className="font-title dark:font-titleDark text-6xl text-cradula-green dark:text-cradula-red dark:tracking-wider">
            404
          </h1>
          <h2 className="p-5 font-title dark:font-titleDark text-3xl text-neutral-900 dark:text-neutral-100 dark:tracking-wide">
            oops! that doesn&apos;t exist
          </h2>
          <hr className="bg-cradula-green dark:bg-cradula-red rounded-sm h-1 border-0 w-3/4 justify-center mx-auto" />
          <div className="flex justify-center p-5 font-body">
            <Link
              href={"/"}
              className="group hover:scale-105 ease-in-out transition-transform duration-500 flex flex-row gap-1 place-items-center"
            >
              <BackArrow />
              <p className="text-neutral-900 dark:text-neutral-100">
                Back to safety
              </p>
            </Link>
          </div>
        </div>
      </section>
      {/* <div className="z-1 absolute md:-right-[180px] -right-[300px] top-0">
        <Splodge />
      </div>
      <div className="z-1 absolute md:-left-[120px] top-2/4 -left-[180px]">
        <Splodge2 />
      </div> */}
    </div>
  );
};
export default FourZeroFour;
