import { LoadingCircles } from "components/Loader/LoadingCircles";
import useTranslation from "next-translate/useTranslation";
import { SyntheticEvent } from "react";
import { useGlobalSearchQuery } from "src/graphql/generated";
import { AccountList } from "./AccountList";
import { AssetList } from "./AssetList";
import { CollectionList } from "./CollectionList";
import classes from "./SearchList.module.css";
import { useDebounce } from "use-debounce";

interface SearchListType {
  query: string;
  submit: (e: SyntheticEvent) => void;
  onClose: any;
}

export const SearchList = ({ query, submit, onClose }: SearchListType) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const [debouncedText] = useDebounce(query, 500);

  const { isLoading, isError, isSuccess, data } = useGlobalSearchQuery(
    {
      query: debouncedText,
      limit: 5,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const globalList = data?.globalSearch;
  const collections = globalList?.collection;
  const assets = globalList?.item;
  const accounts = globalList?.account;
  const allList = collections &&
    assets &&
    accounts && [...collections, ...assets, ...accounts];

  return (
    <div className={classes.wrapper}>
      {isLoading && (
        <p className="text-center m-0 py-3">
          <LoadingCircles />
        </p>
      )}

      {isError && (
        <p className="text-center m-0 py-3">{t("Something went wrong!")}</p>
      )}

      {isSuccess && (
        <div onClick={onClose}>
          {allList && allList.length == 0 && (
            <p className="text-center text-warning m-0 py-3">
              <small>{t("Found nothing!")}</small>
            </p>
          )}

          {/* collections */}
          {collections && collections.length > 0 && (
            <CollectionList collections={collections} />
          )}

          {/* assets */}
          {assets && assets.length > 0 && <AssetList assets={assets} />}

          {/* accounts */}

          {accounts && accounts.length > 0 && (
            <AccountList accounts={accounts} />
          )}
        </div>
      )}

      <button type="button" className={classes.submit} onClick={submit}>
        {t("Press Enter to search all items")}
      </button>
    </div>
  );
};
//lang ok
