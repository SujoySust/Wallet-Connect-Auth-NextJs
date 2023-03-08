import Head from "next/head";
import { useSelector } from "react-redux";
import { base_url } from "src/helpers/functions";
import { RootState } from "src/store";
export default function MetaHeadSection({ metadata }: any) {
  return (
    <Head>
      
      <meta name="author" content={metadata.site_name ?? ''} />
      <meta content="width=device-width,initial-scale=1" name="viewport"></meta>
      
      <meta name="robots" content="index,follow" />

      <meta property='og:url' content={base_url() + metadata.url ?? ""}/>
      <meta content="website" property="og:type"></meta>
      <meta name="title" property='og:title' content={metadata.title ?? ""}/>
      <meta name="description" property="og:description" content={metadata.description ?? ""} />
      <meta name="image" property='og:image' content={metadata.image ?? ""}/>
      <meta content={metadata.site_name ?? ''} property="og:site_name"  />
      <meta content={metadata.site_name ?? ''} name="application-name"></meta>
      
      <title> {metadata.site_name ?? ''} | {metadata.page_title ?? ""} </title>
      
    </Head>
  );
}
//lang ok
