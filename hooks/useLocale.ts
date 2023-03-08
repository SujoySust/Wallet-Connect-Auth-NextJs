/*

      This hook is no longer in use

*/

import { useRouter } from "next/router";

export default function useLocale(en: any, fr: any, ar: any) {
  const { locale } = useRouter();

  return locale === "en"
    ? en
    : locale === "fr"
    ? fr
    : locale === "ar"
    ? ar
    : en;
}
