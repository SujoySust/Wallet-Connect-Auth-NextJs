import { CustomArrowProps } from "react-slick";

export const SlickArrowLeft = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <i
    {...props}
    className={
      "slick-prev slick-arrow fas fa-angle-left" +
      (currentSlide === 0 ? " slick-disabled" : "")
    }
  />
);

export const SlickArrowRight = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <i
    {...props}
    className={
      "slick-next slick-arrow fas fa-angle-right " +
      (currentSlide === slideCount ?? 1 - 1 ? " slick-disabled" : "")
    }
  />
);
