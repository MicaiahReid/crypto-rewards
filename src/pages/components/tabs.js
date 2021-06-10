import React, { useCallback } from "react";

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
          <div
            style={{ cursor: "pointer" }}
            onClick={() => triggerSelectIndex(index)}
          >
            <div style={{ marginTop: 3, fontSize: 22, fontWeight: "800" }}>
              {label}
            </div>
            <div
              style={{
                height: 3,
                backgroundColor: isSelected ? "#24B0FF" : undefined,
              }}
            />
          </div>
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
      }}
    >
      {renderTabs()}
    </div>
  );
};

export default Tabs;
