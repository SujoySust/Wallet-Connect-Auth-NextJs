import { LoadingCircles } from "components/Loader/LoadingCircles";

export const DummyButton = () => {
  return (
    <button
      type="button"
      disabled={true}
      style={{
        cursor: "not-allowed",
        margin: "0 0rem",
        padding: "1.2rem 3.5rem",
        opacity: "0.75",
        backgroundColor: "var(--background-color-2)",
        border: "1px solid var(--primary-color)",
        borderRadius: "1.5rem",
      }}
    >
      <LoadingCircles />
    </button>
  );
};
