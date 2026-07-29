import type { ImgHTMLAttributes } from "react";
import type { ProjectImage } from "../../data/portfolioData";

interface ResponsiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height"> {
  image: ProjectImage;
}

export function ResponsiveImage({
  image,
  loading = "lazy",
  decoding = "async",
  sizes,
  ...props
}: ResponsiveImageProps) {
  return (
    <picture>
      {image.sources?.avif ? (
        <source srcSet={image.sources.avif} sizes={sizes} type="image/avif" />
      ) : null}
      {image.sources?.webp ? (
        <source srcSet={image.sources.webp} sizes={sizes} type="image/webp" />
      ) : null}
      <img
        src={image.url}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        {...props}
      />
    </picture>
  );
}
