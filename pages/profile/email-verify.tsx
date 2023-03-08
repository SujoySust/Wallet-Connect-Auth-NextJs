import BasicLayout from "layouts/basic.layout";
import React, { useEffect } from "react";
import { useUserVerifyMailMutation } from "src/graphql/generated";
import { useRouter } from "next/router";
import { Loading } from "components/Loader/Loading";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";
const EmailVerify = ({ data }: any) => {
  const { t } = useTranslation("common");
  const { settings } = data;
  // const t = (s: string) => s;
  const router = useRouter();
  const [status, setStatus] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);
  const { code } = router.query;
  const { mutateAsync } = useUserVerifyMailMutation();
  const verifyUser = async () => {
    setLoading(true);
    //@ts-ignore
    const res = await mutateAsync({ verificationCode: code?.toString() });
    setStatus(res.userVerifyMail);
    setLoading(false);
  };
  useEffect(() => {
    code && verifyUser();
  }, [code]);
  return (
    <BasicLayout data={settings}>
      <div
        className="section"
        style={{
          height: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading && <Loading />}
        {!loading && status.success === true && (
          <div className="container text-center">
            <h1>{status.message}</h1>
            <Link href="/settings">
              <button className="primary-btn mt-5">
                {t("Back to settings")}
              </button>
            </Link>
          </div>
        )}
        {!loading && status.success === false && (
          <div
            className="container text-center "
            style={{
              border: "1px solid #e5e5e5",
              padding: "20px",
            }}
          >
            <h1>{status.message}</h1>
            <Link href="/settings">
              <button className="primary-btn mt-5">
                {t("Back to settings")}
              </button>
            </Link>
          </div>
        )}
      </div>
    </BasicLayout>
  );
};

export async function getServerSideProps(context: any) {
  const lang = context.locale || "en";
  const settings: any = await getSettingsData(
    [SETTINGS_GROUP_FOOTER, SETTINGS_GROUP_GENERAL, SETTINGS_GROUP_LOGO],
    {
      lang: lang,
    }
  );

  const data = {
    settings,
  };
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  };
}
export default EmailVerify;
