import Image from "next/image";
import { readFileSync } from "node:fs";
import { join } from "path";
import { getPlaiceholder } from "plaiceholder";

interface Props {
  src: string;
  width: number;
  height: number;
  alt: string;
  basePath?: string;
  className?: string;
}

export default function ShowCard(props: Props) {
  let { width, alt, height, basePath, src, className } = { ...props };
  if (!basePath) {
    basePath = join(process.cwd(), "public");
  }
  const imgBuffer = readFileSync(join(basePath, src));
  let base64: string = "";
  getPlaiceholder(imgBuffer).then((v) => (base64 = v.base64));
  return (
    <Image
      src={src}
      width={width}
      height={height}
      blurDataURL={base64}
      className={className || ""}
      alt={alt}
    />
  );
}
