import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import classes from "./SearchList.module.css";

interface assetType {
  id: number;
  name: string;
  slug: string;
  thumbnail_path?: string | null | undefined;
}

export const AssetList = ({ assets }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <ul className={classes.list}>
      <li className={classes.caption}>{t("Assets")}</li>

      {assets.map((asset: assetType) => (
        <li key={asset.id}>
          <Link href={`/assets/${asset.slug}`}>
            <a className={classes.asset}>
              <img
                src={asset.thumbnail_path || "/assets/images/star.svg"}
                alt="asset"
                className={classes.image}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevent looping
                  currentTarget.src = "/assets/images/star.svg";
                }}
              />

              <h4>{asset.name}</h4>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
//lang ok
