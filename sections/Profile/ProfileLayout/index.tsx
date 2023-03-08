import { useState } from "react";
import { Tab } from "@headlessui/react";
import classes from "./ProfileLayout.module.css";
import { FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Drawer } from "../../../components/Drawer";

export const ProfileLayout = ({ sidebarContent, mainContent }: any) => {
  const [isSidebarExtended, setIsSidebarExtended] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <Tab.Panel as="div" className={classes.wrapper}>
        {sidebarContent && (
          <>
            <div
              className={`${classes.sidebar} ${
                isSidebarExtended ? classes.sidebarExtended : ""
              }`}
            >
              <button
                type="button"
                className={classes.sidebarHeader}
                onClick={() => setIsSidebarExtended(!isSidebarExtended)}
              >
                {isSidebarExtended && (
                  <span>
                    {" "}
                    <FiFilter className="mr-3" /> Filter
                  </span>
                )}

                {isSidebarExtended ? (
                  <FiChevronLeft className={classes.sidebarIcon} />
                ) : (
                  <FiChevronRight className={classes.sidebarIcon} />
                )}
              </button>

              {isSidebarExtended && sidebarContent}
            </div>

            <button
              type="button"
              onClick={() => setShowDrawer(true)}
              className={classes.drawerBtn}
            >
              <FiChevronRight />
            </button>
          </>
        )}

        <div className={classes.content}>{mainContent}</div>
      </Tab.Panel>

      {showDrawer && (
        <Drawer
          show={showDrawer}
          onClose={() => setShowDrawer(false)}
          title={
            <span>
              {" "}
              <FiFilter className="mr-2" /> Filter
            </span>
          }
        >
          {sidebarContent}
        </Drawer>
      )}
    </>
  );
};
