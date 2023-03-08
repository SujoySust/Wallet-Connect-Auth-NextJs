import classes from "./ActivityDashboard.module.css";
import { useEffect, useState } from "react";
import { FiFilter, FiRefreshCcw, FiX } from "react-icons/fi";
import { DashboardContainer } from "components/DashboardContainer";
import { DashboardContent } from "components/DashboardContainer/DashboardContent";
import { DashboardSidebar } from "components/DashboardContainer/DashboardSidebar";
import { DrawerButtonForMobile } from "components/DrawerButtonForMobile";
import { FilterChains } from "components/Filters/FilterChains";
import { FilterCollections } from "components/Filters/FilterCollections";
import { FilterItemType } from "src/types";
import { Drawer } from "../../../components/Drawer";
import { FilterEventType } from "components/Filters/FilterEventType";
import { CollectionActivity } from "../CollectionDash/Activity";
import useTranslation from "next-translate/useTranslation";

export const ActivityDashboard = ({
  collectionId,
  blockchainId,
  Chart,
  userId,
  profile,
  showSelected,
  customSidebarHeight,
  setting
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [isSidebarExtended, setIsSidebarExtended] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [fixedSidebar, setFixedSidebar] = useState(false);
  const Height: number = customSidebarHeight ? customSidebarHeight : 280;
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

  // console.log(sort);

  // side bar filters
  const [selectedTokens, setSelectedTokens] = useState<FilterItemType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<FilterItemType[]>([]);
  const [selectedChains, setSelectedChains] = useState<FilterItemType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<FilterItemType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    FilterItemType[]
  >([]);
  const [selectedCollections, setSelectedCollections] = useState<
    FilterItemType[]
  >(collectionId ? [] : []);
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

  // console.log(allFilters);

  const handleAllFilterClear = () => {
    setSelectedTokens([]);
    setSelectedStatus([]);
    setSelectedCategories([]);
    setSelectedCollections([]);
    setSelectedChains([]);
    setPrices([]);
  };

  return (
    <>
      <DashboardContainer>
        <DashboardSidebar
          fixedSidebar={fixedSidebar}
          isSidebarExtended={isSidebarExtended}
          onClick={() => setIsSidebarExtended(!isSidebarExtended)}
        >
          <FilterEventType
            selected={selectedEvent}
            setSelected={setSelectedEvent}
          />
          {profile === true && (
            <FilterCollections
              selected={selectedCollections}
              setSelected={setSelectedCollections}
              userId={userId}
            />
          )}
          {profile === true && (
            <FilterChains
              selected={selectedChains}
              setSelected={setSelectedChains}
            />
          )}
        </DashboardSidebar>

        <DashboardContent
          fixedSidebar={fixedSidebar}
          isSidebarExtended={isSidebarExtended}
        >
          <DrawerButtonForMobile
            onClick={() => setShowDrawer(true)}
            fixedSidebar={fixedSidebar}
          />

          <CollectionActivity
            collectionId={collectionId}
            selectedCollection={selectedCollections}
            selectedChains={selectedChains}
            Chart={Chart}
            selectedEvent={selectedEvent}
            userId={userId}
          />
        </DashboardContent>
      </DashboardContainer>

      {/* bring the sidebar contents here too for responsiveness */}
      <Drawer
        show={showDrawer}
        onClose={() => setShowDrawer(false)}
        setting={setting}
        title={
          <span>
            {" "}
            <FiFilter className="mr-2" /> Filter
          </span>
        }
      >
        <FilterEventType
          selected={selectedEvent}
          setSelected={setSelectedEvent}
        />
        {profile === true && (
          <FilterCollections
            selected={selectedCollections}
            setSelected={setSelectedCollections}
            userId={userId}
          />
        )}
        {profile === true && (
          <FilterChains
            selected={selectedChains}
            setSelected={setSelectedChains}
          />
        )}
      </Drawer>
    </>
  );
};
