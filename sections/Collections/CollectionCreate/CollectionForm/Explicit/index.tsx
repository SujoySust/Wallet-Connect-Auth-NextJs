import { Dispatch, SetStateAction, useState } from "react";
import classes from "./Explicit.module.css";
import { Switch } from "@headlessui/react";
import { FiInfo } from "react-icons/fi";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import {
  InfoIcon,
  RcTooltip,
} from "../../../../../components/Tooltip/rcTooltip";
import useTranslation from "next-translate/useTranslation";

interface ExplicitType {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}

export const ExplicitSwitch = ({ enabled, setEnabled }: ExplicitType) => {
  return (
    <Switch.Group>
      <div className={classes.switchWrapper}>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? classes.switchDisable : classes.switchEnable
          } ${classes.switchButton}`}
        >
          <span
            className={`${
              enabled ? classes.switchDiscDisable : classes.switchDiscEnable
            } ${classes.switchDisc}`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

export const ExplicitSubTitle = () => {
  const { t } = useTranslation("common");
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
  const [hidden, setHidden] = useState(false);
  return (
    <>
      <span>
        {t("Set this collection as explicit and sensitive content")}
        <RcTooltip
          overlay={t(
            "Setting your collection as explicit and sensitive content, like pornography and other not safe for work (NSFW) content, will protect users with safe search while browsing NFT."
          )}
        >
          <InfoIcon />
        </RcTooltip>
      </span>

      {/* {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          <div {...getArrowProps({ className: "tooltip-arrow" })} />

          <div className="tooltip-content">
            Setting your collection as explicit and sensitive content, like
            pornography and other not safe for work (NSFW) content, will protect
            users with safe search while browsing NFT.
          </div>
        </div>
      )} */}
    </>
  );
};
