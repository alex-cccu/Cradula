import AnimatedWords from "./AnimatedWords";
import Cradula from "../../assets/Cradula";
import Link from "next/link";

export default function Title() {
  return (
    <header className="font-title dark:font-titleDark font-light text-neutral-900 text-center z-2">
      <h1>
        <div className="group w-auto">
          <Link href="/">
            <Cradula isColour={true} />
            <div className="cursor-default -mt-4">
              <span className="dark:text-neutral-100 dark:uppercase text-xl">
                <AnimatedWords
                  words={[
                    "articles",
                    "portfolio",
                    "pictures",
                    "website",
                    "ramblings",
                    "projects",
                    "sidequests",
                    "nonsense",
                    "bits'n'bobs",
                  ]}
                />
              </span>
            </div>
          </Link>
        </div>
      </h1>
    </header>
  );
}
