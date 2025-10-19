import Splodge from "@/assets/Splodge";
import Splodge2 from "@/assets/Splodge2";
import HomePageContent from "@/components/HomePage/HomePageContent";
import Title from "@/components/Title/Title";

const HomePage = () => {
  return (
    <div className="dark:bg-neutral-900 bg-neutral-100 w-screen overflow-hidden">
      <section className="mx-auto w-11/12 md:w-6/8 lg:w-5/8 xl:w-1/2 mt-20 flex flex-col gap-16 mb-20 z-10">
        <Title />
        <div className="z-1 absolute right-1/12 top-1/4 lg:top-1/6 animate-appear-slow">
          <Splodge />
        </div>
        <div className="top-14/15 z-1 absolute left-1/8 lg:top-3/5 hidden lg:block animate-appear-slow">
          <Splodge2 />
        </div>
        <HomePageContent />
      </section>
    </div>
  );
};

export default HomePage;
