import classes from "./Banner.module.css";

export const Banner = ({ imgSrc }: any) => {
  return (
    <section
      className={`${classes.banner} ${imgSrc ? "" : classes.bannerNoImg}`}
      style={{ backgroundImage: imgSrc ? `url(${imgSrc})` : "" }}
    />
  );
};
