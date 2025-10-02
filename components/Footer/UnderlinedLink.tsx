type linkProps = {
  href: string;
  text: string;
};

const UnderlinedLink = ({ href, text }: linkProps) => {
  return (
    <a
      href="#"
      className="group relative inline-block text-2xl font-semibold text-white"
    >
      twitter
      {/* Fang container spans text width */}
      <span className="absolute left-0 top-full mt-1 w-full flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {/* White gum bar full width */}
        <span className="w-full h-1 bg-white rounded-t-sm" />
        {/* Two smaller fangs at the ends */}
        <span className="w-full flex justify-between -mt-px">
          <span className="w-1.5 h-3 bg-white [clip-path:polygon(50%_100%,0_0,100%_0)]" />
          <span className="w-1.5 h-3 bg-white [clip-path:polygon(50%_100%,0_0,100%_0)]" />
        </span>
      </span>
    </a>
  );
};

export default UnderlinedLink;
