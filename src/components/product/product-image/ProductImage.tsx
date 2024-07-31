import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
}

export const ProductImage = ({
  alt,
  height,
  width,
  className,
  src,
  style,
}: Props) => {
  const localSrc = src
    ? src.startsWith("http") // https://urlcompletodelaimagen.jpg
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return (
    <>
      <Image
        src={localSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
      />
    </>
  );
};
