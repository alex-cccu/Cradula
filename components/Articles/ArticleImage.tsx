import Image from "next/image";

type ArticleImageProps = {
  height?: number;
  width?: number;
  src: string;
  alt: string;
};

const ArticleImage = ({
  height = 400,
  width = 300,
  src,
  alt,
}: ArticleImageProps) => {
  return (
    <div className="relative w-fit mx-auto">
      <Image height={height} width={width} src={src} alt={alt} />
    </div>
  );
};

export default ArticleImage;
