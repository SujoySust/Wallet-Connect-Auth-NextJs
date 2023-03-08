import useTranslation from "next-translate/useTranslation";
import { useRef } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { TinyLoader } from "./TinyLoader";

export const ItemLoaderButton = ({ controls }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = controls;

  const loadMoreButtonRef = useRef<any>();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  return hasNextPage ? (
    <div className="w-100 col-12 text-center mt-5" ref={loadMoreButtonRef}>
      <button
        type="button"
        className="primary-btn"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        aria-label={t("Load More Items")}
      >
        {isFetchingNextPage ? (
          <TinyLoader />
        ) : hasNextPage ? (
          t("Load More")
        ) : (
          t("Nothing More To Load")
        )}
      </button>
    </div>
  ) : null;
};
//lang ok
