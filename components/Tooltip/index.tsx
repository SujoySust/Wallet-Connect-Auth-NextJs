import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import { FiInfo } from "react-icons/fi";

export const CustomTooltip = ({ icon, children }: any) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    placement: "top",
    trigger: "hover",
  });

  return (
    <>
      <span ref={setTriggerRef}>
        {icon ? (
          icon
        ) : (
          <FiInfo
            style={{
              marginLeft: "0.5rem",
              marginTop: "-0.25rem",
              color: "var(--text-color)",
              cursor: "pointer",
            }}
          />
        )}
      </span>

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          <div {...getArrowProps({ className: "tooltip-arrow" })} />

          <div className="tooltip-content">{children}</div>
        </div>
      )}
    </>
  );
};
//lang ok
