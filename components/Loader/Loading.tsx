import { TinyLoader } from "./TinyLoader";

export const Loading = () => {
  return (
    <div
      style={{
        width: "6rem",
        height: "6rem",
        margin: "0 auto",
        marginTop: "5rem",
        borderRadius: "50%",
        background: "var(--primary-color)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <TinyLoader />
    </div>
  );
};
//lang ok
