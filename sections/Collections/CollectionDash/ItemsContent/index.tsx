import { NoItems } from "../../../../components/NoItems";
import { SearchFilterBar } from "../../../../components/SearchFilterBar";
import classes from "./ItemsContent.module.css";
import { ItemCard } from "../../../../components/ItemCard";

export const ItemsContent = ({ collectionData, queryInput }: any) => {
  const { items, collection } = collectionData;

  // console.log(items[1]);
  // console.log(collection);

  const highestBid = (arr: any[]) => Math.max(...arr.sort());

  return (
    <>
      <SearchFilterBar onSearch={queryInput} />

      {/* <div className={classes.collectionWrapper}>
        {items.length > 0 ? (
          items?.map((item: any) => {
            return <ItemCard key={item.id} item={item} />;
          })
        ) : (
          <NoItems />
        )}
      </div> */}
    </>
  );
};
//lang ok
