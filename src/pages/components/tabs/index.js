import React, { useCallback } from "react";
import TabLabel from "./components/tab-label";

const Tabs = ({ selectedIndex, tabs, onSelectIndex }) => {
  const triggerSelectIndex = useCallback(
    (index) => onSelectIndex(index),
    [onSelectIndex]
  );

  const renderTabs = useCallback(() => {
    return tabs.map((label, index) => {
      const isLastItem = index === tabs.length - 1;
      const isSelected = selectedIndex === index;
      return (
        <div style={{ display: "flex" }} key={label}>
          {/** Tab */}
          <TabLabel
            label={label}
            isSelected={isSelected}
            onSelect={triggerSelectIndex}
            index={index}
          />
          {/** Divider */}
          {!isLastItem ? (
            <div
              style={{
                width: 2,
                backgroundColor: "#E6E7ED",
                margin: "8px 24px",
              }}
            ></div>
          ) : null}
        </div>
      );
    });
  }, [selectedIndex, triggerSelectIndex, tabs]);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        marginBottom: 16,
      }}
    >
      {renderTabs()}
    </div>
  );
};

export default Tabs;
