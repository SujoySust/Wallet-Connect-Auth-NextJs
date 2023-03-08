import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import { ReactElement, ReactNode } from "react";
import { FiInfo } from "react-icons/fi";

interface TooltipType {
  placement?: string;
  overlay: string | ReactElement;
  children: ReactNode;
  className?: string;
}

export const RcTooltip = ({
  placement = "top",
  overlay,
  children,
  className,
}: TooltipType) => {
  return (
    <Tooltip
      placement={placement}
      overlay={overlay}
      overlayClassName="rcTooltipOverlay"
    >
      <span className={className}>{children}</span>
    </Tooltip>
  );
};

export const InfoIcon = () => (
  <FiInfo
    style={{
      marginLeft: "0.5rem",
      marginTop: "-0.25rem",
      color: "var(--text-color)",
      cursor: "pointer",
    }}
  />
);
//lang ok
