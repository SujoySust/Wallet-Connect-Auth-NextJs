import React from "react";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useResendVerifcationEmailMutation } from "src/graphql/generated";
import { RootState } from "src/store";
import classes from "./EmailVerifiedWarning.module.css";
import useTranslation from "next-translate/useTranslation";
const EmailVerifiedWarning = () => {
  const resendMutation = useResendVerifcationEmailMutation();
  const { addToast } = useToasts();
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const resend = async () => {
    const res = await resendMutation.mutateAsync({});
    const { code, message, success } = res.resendVerifcationEmail;
    success === true &&
      addToast(message, { appearance: "success", autoDismiss: true });
    success === false &&
      addToast(message, { appearance: "error", autoDismiss: true });
  };
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  return (
    <div className={classes.warningContainer}>
      <span className={classes.message}>
        {t("Please check")} {userData.email}{" "}
        {t(
          "and verify your new email address. Still no email after a couple minutes?"
        )}
        <span className={classes.click} onClick={resend}>
          {" "}
          {t("Click here to resend.")}
        </span>
      </span>
    </div>
  );
};

export default EmailVerifiedWarning;
//lang ok
