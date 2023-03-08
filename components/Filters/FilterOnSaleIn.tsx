import { ItemLoaderButton } from "components/Loader/ItemLoaderButton";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { ProfileDisclosure } from "components/ProfileDisclosure";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useInfiniteGetTokenListsPaginateForFilterQuery } from "src/graphql/generated";
import { FilterComponentType } from "src/types";
import { useDebounce } from "use-debounce";
import { FilterButtonWithImage } from "./FilterButtonWithImage";
import classes from "./SidebarItems.module.css";

export const FilterOnSaleIn = ({
  selected,
  setSelected,
  collectionId,
}: FilterComponentType) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [queryText, setQueryText] = useState("");
  const [debouncedText] = useDebounce(queryText, 500);
  // run the query
  const {
    data,
    isLoading,
    error,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteGetTokenListsPaginateForFilterQuery(
    {
      first: 5,
      query: debouncedText,
      collection_id: collectionId ? collectionId : null,
    },
    {
      getNextPageParam: (p) => {
        if (p.getTokenListsPaginate.pageInfo.hasNextPage) {
          return {
            first: 5,
            after: p.getTokenListsPaginate.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const totalCount = data?.pages[0]?.getTokenListsPaginate?.totalCount;

  return (
    <ProfileDisclosure title={t("on sale in")}>
      {/* input */}
      <label
        htmlFor="collections"
        className={`input-group mb-3 ${classes.inputGroup}`}
      >
        <span className={`input-group-text ${classes.inputGroupText}`}>
          <FiSearch />
        </span>

        <input
          type="search"
          name="collections"
          id="collections"
          className={`form-control ${classes.inputGroupInput}`}
          placeholder="Filter"
          aria-label="collections"
          onChange={(e) => setQueryText(e.target.value)}
        />
      </label>

      {/* list */}

      {isLoading && (
        <p className="text-center">
          <LoadingCircles />
        </p>
      )}

      {error && (
        <p className="text-center text-danger">{t("Something went wrong!")}</p>
      )}

      {isSuccess && totalCount === 0 ? (
        <p className="text-center">{t("No tokens found!")}</p>
      ) : (
        data?.pages?.map((page) => {
          return page.getTokenListsPaginate.edges?.map((el) => (
            <FilterButtonWithImage
              key={el.node.id}
              selected={selected}
              setSelected={setSelected}
              id={el.node.id}
              title={el.node.name}
              logo={el.node.logo}
            />
          ));
        })
      )}

      {isSuccess && (
        <ItemLoaderButton
          controls={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
        />
      )}
    </ProfileDisclosure>
  );
};
//lang ok
