import useTranslation from "next-translate/useTranslation";

export const NoItems = ({ title, className }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "30rem",
        padding: "1rem",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        fontSize: "2.5rem",
        border: "1px solid var(--border-4)",
        borderRadius: "1rem",
      }}
      className={className}
    >
      {title || t("No items to display")}
    </div>
  );
};
