import Link from "next/link";
import { FiZap } from "react-icons/fi";
import { InfoIcon, RcTooltip } from "../../../../components/Tooltip/rcTooltip";
import classes from "./Intro.module.css";
import useTranslation from "next-translate/useTranslation";

const MoreOptions = [
  {
    icon: <FiZap />,
    url: "/get-listed",
    label: "Import an existing smart contract",
    onsite: true,
  },
  {
    icon: <FiZap />,
    url: "https://studio.manifold.xyz/",
    label: "Mint with Manifold Studio",
    onsite: false,
  },
  {
    icon: <FiZap />,
    url: "https://app.rarible.com/create",
    label: "Mint on Rarible",
    onsite: false,
  },
  {
    icon: <FiZap />,
    url: "https://mintbase.io/",
    label: "Mint on Mintbase",
    onsite: false,
  },
  {
    icon: <FiZap />,
    url: "https://mintable.app/",
    label: "Mint on Mintable",
    onsite: false,
  },
  {
    icon: <FiZap />,
    url: "https://zora.co/",
    label: "Mint on Zora",
    onsite: false,
  },
];

export const Intro = ({ asset }: any) => {
  const {t} = useTranslation('common')
  // const t = (s: string) => s;

  return (
    <div className={classes.intro}>
      <h2 className={classes.title}>{t("All Collections")}</h2>

      <div className={classes.subtitle}>
        {t(
          "Create, curate, and manage collections of unique NFTs to share and sell."
        )}

        {/* <RcTooltip
          overlay={t(
            "Collections can be created either directly on Open NFT or imported from an existing smart contract. You can also mint on other services like Rarible or Mintable and import the items to Open NFT."
          )}
        >
          <InfoIcon />
        </RcTooltip> */}
      </div>

      {asset ? (
        <Link href={`/assets/create`}>
          <a className={`primary-btn`}>{t("Create an asset")}</a>
        </Link>
      ) : (
        <Link href={`/collections/create`}>
          <a className={`primary-btn`}>{t("Create a collection")}</a>
        </Link>
      )}

      {/* 
      <HeadlessMenu btnText={<FiMoreVertical aria-label="more options" />}>
        <div className={`list-group ${classes.linkList}`}>
          {MoreOptions.map((el) =>
            el.onsite ? (
              <Link key={el.label} href={el.url}>
                <a className={"list-group-item " + classes.link}>
                  {" "}
                  {el.icon} {el.label}
                </a>
              </Link>
            ) : (
              <a
                key={el.label}
                href={el.url}
                target="_blank"
                rel="noopener noreferrer"
                className={"list-group-item " + classes.link}
              >
                {el.icon} {el.label}
              </a>
            )
          )}
        </div>
      </HeadlessMenu> */}
    </div>
  );
};
//lang ok
