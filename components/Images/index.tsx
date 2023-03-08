import Image from "next/image";
import React, { useEffect, useState } from "react";
export const ImageItem = ({
  src,
  alt,
  width,
  height,
  className,
  onClick,
  layout,
  forModal = false,
  isNextImage = true,
}: any) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  return (
    <div>
      <Image
        loader={() => imgSrc}
        // priority
        // unoptimized={true}
        src={imgSrc}
        blurDataURL="/assets/images/star.svg"
        alt={alt}
        onClick={onClick}
        onError={() => {
          setImgSrc("/assets/images/star.svg");
        }}
        placeholder="blur"
        width={width ? width : 50}
        height={height ? height : 50}
        layout={layout ? layout : "fill"}
        className={className}
      />
    </div>
  );
};

export const ImageProfile = ({
  src,
  alt,
  width,
  height,
  className,
  onClick,
  forModal = false,
}: any) => (
  <img
    src={src || "/assets/images/default-user.svg"}
    alt={alt}
    onError={({ currentTarget }) => {
      currentTarget.onerror = null; // prevent looping
      currentTarget.src = "/assets/images/default-user.svg";
    }}
    width={width}
    height={height}
    className={className}
    style={{
      maxHeight: forModal ? "85vh" : "",
    }}
    onClick={onClick}
  />
);
//lang ok
