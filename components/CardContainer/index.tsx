import { useSelector } from "react-redux";
import { RootState } from "../../src/store";

export const CardContainer = ({ children }: any) => {
  const isWider = useSelector((state: RootState) => state.contentWide.isWider);

  return (
    <div
      className={isWider ? "col-lg-4 col-md-6" : "col-xl-3 col-lg-4 col-md-6"}
      style={{ transition: "all 0.4s" }}
    >
      {children}
    </div>
  );
};
//lang ok
