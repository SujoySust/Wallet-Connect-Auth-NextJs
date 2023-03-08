import { ItemCard } from "../../../../components/ItemCard";
import { ItemLoaderButton } from "../../../../components/Loader/ItemLoaderButton";
import { Loading } from "../../../../components/Loader/Loading";
import { NoItems } from "../../../../components/NoItems";
import { SearchFilterBar } from "../../../../components/SearchFilterBar";
import { useInfiniteGetItemListsQuery } from "../../../../src/graphql/generated";
import classes from "../Dashboard.module.css";
import { FilterItemType } from "src/types";
import { useEffect, useState } from "react";
import { DashboardContainer } from "components/DashboardContainer";
import { DashboardSidebar } from "components/DashboardContainer/DashboardSidebar";
import { FilterStatus } from "components/Filters/FilterStatus";
import { FilterOnSaleIn } from "components/Filters/FilterOnSaleIn";
import { FilterPrice } from "components/Filters/FilterPrice";
import { FilterCollections } from "components/Filters/FilterCollections";
import { FilterChains } from "components/Filters/FilterChains";
import { FilterCategories } from "components/Filters/FilterCategories";
import { DashboardContent } from "components/DashboardContainer/DashboardContent";
import { FilterButtonRemove } from "components/FilterButtonContent/FilterButtonRemove";
import { handleRemoveFilterData } from "src/helpers/functions";
import { FilterButtonContent } from "components/FilterButtonContent";
import { RcTooltip } from "components/Tooltip/rcTooltip";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";
import { DrawerButtonForMobile } from "components/DrawerButtonForMobile";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { Drawer } from "components/Drawer";
import useTranslation from "next-translate/useTranslation";
import { useDebounce } from "use-debounce";

export const OwnedNft = ({ ownerId, setting }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [isSidebarExtended, setIsSidebarExtended] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [fixedSidebar, setFixedSidebar] = useState(false);
  const Height: number = 680;
  const handleScroll = () =>
    window.scrollY > Height ? setFixedSidebar(true) : setFixedSidebar(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // sorting
  const [sort, setSort] = useState({
    field: "id",
    direction: "desc",
  });
  const [query, setQuery] = useState("");
  const [debouncedText] = useDebounce(query, 500);

  const [selectedTokens, setSelectedTokens] = useState<FilterItemType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<FilterItemType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    FilterItemType[]
  >([]);
  const [selectedCollections, setSelectedCollections] = useState<
    FilterItemType[]
  >([]);
  const [selectedChains, setSelectedChains] = useState<FilterItemType[]>([]);
  const [prices, setPrices] = useState<any[]>([]);

  // to remove the falsy values from the array
  prices.map((el) =>
    Object.keys(el).forEach((key) => {
      if (!el[key]) {
        delete el[key];
      }
    })
  );
  const allFilters = [
    ...selectedTokens,
    ...selectedStatus,
    ...selectedCategories,
    ...selectedCollections,
    ...selectedChains,
    ...prices,
  ];
  const handleAllFilterClear = () => {
    setSelectedTokens([]);
    setSelectedStatus([]);
    setSelectedCategories([]);
    setSelectedCollections([]);
    setSelectedChains([]);
    setPrices([]);
  };

  const {
    data: ownedItems,
    isLoading,
    error,
    refetch,
    isRefetching,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteGetItemListsQuery(
    {
      first: 10,
      after: undefined,
      status: selectedStatus.length ? selectedStatus.map((el) => el.id) : null,
      owner_id: ownerId,
      viewer_id: ownerId,
      min_price: prices[0] ? prices[0].minPrice : null,
      max_price: prices[0] ? prices[0].maxPrice : null,
      payment_token_id: selectedTokens.length
        ? selectedTokens.map((el) => el.id)
        : null,
      collection_id: selectedCollections.length
        ? selectedCollections.map((el) => el.id)
        : null,
      blockchain_id: selectedChains.length
        ? selectedChains.map((el) => el.id)
        : null,
      category_id: selectedCategories.length
        ? selectedCategories.map((el) => el.id)
        : null,
      //@ts-ignore
      orderBy: sort,
      query: debouncedText,
    },
    {
      getNextPageParam: (p: any) => {
        if (p.getItemLists.pageInfo.hasNextPage) {
          return {
            first: 10,
            after: p.getItemLists.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const totalItems = ownedItems?.pages[0].getItemLists?.totalCount ?? 0;
  // console.log("totalItems", totalItems);
  return (
    <>
      <DashboardContainer>
        <DashboardSidebar
          fixedSidebar={fixedSidebar}
          isSidebarExtended={isSidebarExtended}
          onClick={() => setIsSidebarExtended(!isSidebarExtended)}
        >
          <FilterStatus
            selected={selectedStatus}
            setSelected={setSelectedStatus}
          />

          <FilterOnSaleIn
            selected={selectedTokens}
            setSelected={setSelectedTokens}
          />

          <FilterPrice prices={prices} setPrices={setPrices} />

          <FilterCollections
            selected={selectedCollections}
            setSelected={setSelectedCollections}
            userId={ownerId}
          />

          <FilterChains
            selected={selectedChains}
            setSelected={setSelectedChains}
          />

          <FilterCategories
            selected={selectedCategories}
            setSelected={setSelectedCategories}
          />
        </DashboardSidebar>
        {/* <SearchFilterBar /> */}
        <DashboardContent
          fixedSidebar={fixedSidebar}
          isSidebarExtended={isSidebarExtended}
        >
          <DrawerButtonForMobile
            onClick={() => setShowDrawer(true)}
            fixedSidebar={fixedSidebar}
          />
          <SearchFilterBar setSort={setSort} setQuery={setQuery} />
          <div className={classes.contentHeader}>
            <div className={classes.contentHeaderRefresh}>
              <RcTooltip overlay={t("Refresh")}>
                <button
                  type="button"
                  aria-label="refresh"
                  onClick={() => refetch()}
                >
                  <FiRefreshCcw aria-label="refresh" />
                </button>
              </RcTooltip>

              <p className="m-0">
                {isRefetching || isLoading ? (
                  t("Loading Items...")
                ) : (
                  <>
                    {/* @ts-ignore */}
                    {totalItems} {totalItems > 1 ? t("items") : t("item")}
                  </>
                )}
              </p>
            </div>
            <div></div>

            {/* <SortingMenu setSort={setSort} className={classes.sortSelect} /> */}
          </div>
          {allFilters.length > 0 ? (
            <FilterButtonContent onClear={handleAllFilterClear}>
              {selectedStatus.map((el, idx) => (
                <FilterButtonRemove
                  key={el.id + el.title + idx}
                  title={el.title}
                  onClick={() =>
                    handleRemoveFilterData(
                      el,
                      selectedStatus,
                      setSelectedStatus
                    )
                  }
                />
              ))}

              {selectedTokens.map((el, idx) => (
                <FilterButtonRemove
                  key={el.id + el.title + idx}
                  title={el.title}
                  onClick={() =>
                    handleRemoveFilterData(
                      el,
                      selectedTokens,
                      setSelectedTokens
                    )
                  }
                />
              ))}

              {prices.map((el, idx) => (
                <>
                  {el.minPrice && el.maxPrice ? (
                    <FilterButtonRemove
                      key={idx}
                      title={`Price: ${el.minPrice + " - " + el.maxPrice}`}
                      onClick={() => setPrices([])}
                    />
                  ) : el.minPrice ? (
                    <FilterButtonRemove
                      key={idx}
                      title={`Price: ${el.minPrice && "> " + el.minPrice}`}
                      onClick={() => setPrices([])}
                    />
                  ) : el.maxPrice ? (
                    <FilterButtonRemove
                      key={idx}
                      title={`Price: ${el.maxPrice && "< " + el.maxPrice}`}
                      onClick={() => setPrices([])}
                    />
                  ) : null}
                </>
              ))}

              {selectedCollections.map((el, idx) => (
                <FilterButtonRemove
                  key={el.id + el.title + idx}
                  title={el.title}
                  onClick={() =>
                    handleRemoveFilterData(
                      el,
                      selectedCollections,
                      setSelectedCollections
                    )
                  }
                />
              ))}

              {selectedChains.map((el, idx) => (
                <FilterButtonRemove
                  key={el.id + el.title + idx}
                  title={el.title}
                  onClick={() =>
                    handleRemoveFilterData(
                      el,
                      selectedChains,
                      setSelectedChains
                    )
                  }
                />
              ))}

              {selectedCategories.map((el, idx) => (
                <FilterButtonRemove
                  key={el.id + el.title + idx}
                  title={el.title}
                  onClick={() =>
                    handleRemoveFilterData(
                      el,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                />
              ))}
            </FilterButtonContent>
          ) : null}

          {isLoading && (
            <div className="mt-5 text-center">
              <LoadingCircles />
            </div>
          )}

          {totalItems === 0 && !isLoading && (
            <NoItems title={t("No items to display")} />
          )}

          {/* {ownedItems?.pages?.map((page) => {
            return page.getItemLists.edges?.map((item) => (
              <ItemCard key={item.node.id} item={item.node} />
            ));
          })} */}
          {isSuccess && totalItems === 0
            ? // <NoItems title={t("No items to display")} />
              ""
            : ownerId && (
                <div className={classes.items}>
                  {ownedItems?.pages?.map((page) => {
                    return page.getItemLists.edges?.map((item) => (
                      <ItemCard key={item.node.id} item={item.node} />
                    ));
                  })}
                </div>
              )}

          <ItemLoaderButton
            controls={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
          />
        </DashboardContent>
      </DashboardContainer>
      <Drawer
        show={showDrawer}
        onClose={() => setShowDrawer(false)}
        setting={setting}
        title={
          <span>
            {" "}
            <FiFilter className="mr-2" /> {t("Filter")}
          </span>
        }
      >
        <FilterStatus
          selected={selectedStatus}
          setSelected={setSelectedStatus}
        />

        <FilterOnSaleIn
          selected={selectedTokens}
          setSelected={setSelectedTokens}
        />

        <FilterPrice prices={prices} setPrices={setPrices} />

        <FilterCollections
          selected={selectedCollections}
          setSelected={setSelectedCollections}
          userId={ownerId}
        />

        <FilterChains
          selected={selectedChains}
          setSelected={setSelectedChains}
        />

        <FilterCategories
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />
      </Drawer>
    </>
  );
};
