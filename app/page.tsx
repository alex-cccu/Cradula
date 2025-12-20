import HomePageContent from "@/components/HomePage/HomePageContent";
import Title from "@/components/Title/Title";

const HomePage = () => {
  return (
    <div className="w-screen overflow-hidden">
      <section className="mx-auto w-11/12 md:w-6/8 lg:w-5/8 xl:w-1/2 mt-20 flex flex-col gap-16 mb-20 z-10">
        <Title />
        <HomePageContent />
      </section>
    </div>
  );
};

export default HomePage;
