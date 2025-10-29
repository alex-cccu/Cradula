import LinkedIn from "@/assets/LinkedIn";
import Github from "@/assets/Github";
import Cradula from "../../assets/Cradula";
import Link from "next/link";
import getAllPages from "@/lib/pages/getAllPages";
import FooterThemeToggle from "./FooterThemeToggle";

const Footer = async () => {
  const pages = getAllPages();

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 160 1440 160">
        <path
          fillOpacity="1"
          d="M0,192L60,208C120,224,240,256,360,250.7C480,245,600,203,720,181.3C840,160,960,160,1080,170.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          className="fill-cradula-green dark:fill-cradula-red"
        ></path>
      </svg>

      <div className="-mt-px relative h-auto mx-auto my-0 px-10 flex flex-col items-center justify-between gap-10 bg-cradula-green dark:bg-cradula-red">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 z-5">
          <div className="sm:flex sm:justify-between">
            <div className="mb-6 sm:mb-0">
              <Link
                href="/"
                className="flex items-center mb-4 sm:mb-0 justify-center space-x-3 rtl:space-x-reverse font-title dark:font-titleDark group z-3"
              >
                <Cradula isColour={false} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-8 sm:gap-6 sm:grid-cols-3 items-center text-center font-body font-extrabold">
              {(await pages).map((page) => {
                return (
                  <Link
                    href={`/${encodeURIComponent(page.id)}`}
                    key={page.title}
                  >
                    <h2 className="text-md uppercase text-neutral-100 hover:scale-115 ease-in-out transition-transform duration-500">
                      {page.title}
                    </h2>
                  </Link>
                );
              })}
              <Link href={"/contact"}>
                <h2 className="text-md uppercase text-neutral-100 hover:scale-115 ease-in-out transition-transform duration-500">
                  Contact
                </h2>
              </Link>
            </div>
          </div>
          <hr className="my-6 border-neutral-100 sm:mx-auto lg:my-8" />
          <div className="sm:flex items-center text-center sm:text-left sm:justify-between">
            <div className="flex mt-4 mb-4 sm:mb-0 justify-center sm:mt-0 sm:order-last">
              <div>
                <LinkedIn />
                <span className="sr-only">LinkedIn page</span>
              </div>
              <div>
                <Github />
                <span className="sr-only">Github page</span>
              </div>
              <div>
                <FooterThemeToggle />
              </div>
            </div>
            <span className="text-md dark:text-xl text-center text-neutral-100 font-title dark:font-titleDark">
              Copyright {new Date().getFullYear()}. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
