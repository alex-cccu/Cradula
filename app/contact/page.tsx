import BackArrow from "@/assets/BackArrow";
import Splodge from "@/assets/Splodge";
import Splodge2 from "@/assets/Splodge2";
import ZigZag from "@/assets/ZigZag";
import getShuffledColours from "@/lib/utils/getShuffledColours";
import Link from "next/link";

const Contact = () => {
  const colours = getShuffledColours(["cradula-green"]);
  return (
    <div className="relative overflow-y-hidden overflow-x-hidden w-screen">
      <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5 z-2">
        <div className="flex justify-between font-body z-2">
          <Link
            href={"/"}
            className="group hover:scale-105 ease-in-out transition-transform duration-500 flex flex-row gap-1 place-items-center"
          >
            <BackArrow />
            <p>Back to safety</p>
          </Link>
        </div>
        <div className="flex flex-col mx-auto text-center my-5 animate-appear-fast z-2">
          <ZigZag colour={colours[0]} animated={false}>
            <h1 className="font-title dark:font-titleDark text-4xl dark:text-5xl text-center tracking-tight dark:tracking-normal">
              Contact Me
            </h1>
          </ZigZag>
        </div>
        <div className="px-4 mx-auto max-w-screen-md z-2 animate-appear">
          <p className="font-light text-center text-neutral-900 dark:text-neutral-100 sm:text-xl">
            So you want to get in touch with me eh? Well you&apos;ve come to the
            right place!
          </p>
          <p className="mb-8 lg:mb-12 font-light text-center text-neutral-900 dark:text-neutral-100 sm:text-xl">
            Fill out the form below and you never know, I might just get back to
            you...
          </p>
          <form action="#" className="space-y-8 z-2">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg dark:text-xl dark:tracking-wider font-medium font-title dark:font-titleDark text-neutral-900 dark:text-neutral-100"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border-2 border-cradula-green text-neutral-900 text-sm rounded-xl 
                focus:ring-cradula-orange focus:border-cradula-orange block w-full p-2.5 dark:bg-neutral-700 
                dark:border-cradula-red dark:placeholder-neutral-350 placeholder-neutral-400 font-body dark:text-neutral-100 dark:focus:ring-cradula-dark-red
                dark:focus:border-cradula-dark-red dark:shadow-sm-light
                focus:scale-110 md:focus:scale-105 transition-transform ease-in-out duration-500"
                placeholder="kingjulian@madagascar.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-lg dark:text-xl dark:tracking-wider font-medium font-title dark:font-titleDark text-neutral-900 dark:text-neutral-100"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="shadow-sm bg-gray-50 border-2 border-cradula-green text-neutral-900 text-sm rounded-xl 
                focus:ring-cradula-orange focus:border-cradula-orange block w-full p-2.5 dark:bg-neutral-700 
                dark:border-cradula-red dark:placeholder-neutral-350 placeholder-neutral-400 font-body dark:text-neutral-100 dark:focus:ring-cradula-dark-red
                dark:focus:border-cradula-dark-red dark:shadow-sm-light
                focus:scale-110 md:focus:scale-105 transition-transform ease-in-out duration-500"
                placeholder="I like to move it, move it"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-lg dark:text-xl dark:tracking-wider font-medium font-title dark:font-titleDark text-neutral-900 dark:text-neutral-100"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="shadow-sm bg-gray-50 border-2 border-cradula-green text-neutral-900 text-sm rounded-xl 
                focus:ring-cradula-orange focus:border-cradula-orange block w-full p-2.5 dark:bg-neutral-700 
                dark:border-cradula-red dark:placeholder-neutral-350 placeholder-neutral-400 font-body dark:text-neutral-100 dark:focus:ring-cradula-dark-red
                dark:focus:border-cradula-dark-red dark:shadow-sm-light
                focus:scale-110 md:focus:scale-105 transition-transform ease-in-out duration-500"
                placeholder="I like to move it, move it.
                I like to move it, move it.
                You like to, move it!"
              ></textarea>
            </div>
            <button
              type="submit"
              className="font-title dark:font-titleDark text-md dark:text-lg dark:tracking-wider h-[40px] w-[150px] 
              bg-neutral-50 shadow-sm border-cradula-pink border-2 rounded-xl mb-5 
              hover:scale-110 transition-transform ease-in-out duration-500
              dark:bg-neutral-700 dark:border-cradula-red"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
      <div className="z-0 absolute md:-right-[180px] -right-[300px] top-0 lg:top-1/6 animate-appear-slow">
        <Splodge />
      </div>
      <div className="bottom-0 z-0 absolute md:-left-[120px] -left-[200px] animate-appear-slow">
        <Splodge2 />
      </div>
    </div>
  );
};

export default Contact;
