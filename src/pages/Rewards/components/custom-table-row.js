import React, { useCallback, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import RoundButton from "../../components/round-button";
import { useDispatch } from "react-redux";
import { verifyRewards, selectCampaign } from "../../../services/redux/actions";

const CustomTableRow = ({ campaign }) => {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();

  const triggerSelectCampaign = useCallback(() => {
    dispatch(selectCampaign(campaign));
  }, [dispatch, campaign]);

  const renderButton = useCallback(() => {
    if (campaign.status === "claimed") {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <RoundButton
              style={{
                backgroundColor: "#414141",
                borderColor: "#414141",
              }}
              size={"small"}
              label="Claimed"
              leftIcon={
                <img
                  style={{ height: 15, width: 15, marginRight: 8 }}
                  src={"green-check.png"}
                  alt={"green-check"}
                ></img>
              }
            />
          </div>{" "}
        </div>
      );
    } else if (campaign.status === "enrolled") {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <RoundButton
              onPress={() => dispatch(verifyRewards(campaign._id))}
              style={{
                backgroundColor: `${`rgba(55, 215, 100, 1)`}`,
                borderColor: `${`rgba(55, 215, 100, 1)`}`,
              }}
              size={"small"}
              label="Claim"
            />
          </div>{" "}
        </div>
      );
    } else {
      return null;
    }
  }, [dispatch, campaign]);

  return (
    <TableRow
      style={{
        backgroundColor: isHovering ? "rgba(36, 176, 255, 0.1)" : "transparent",
        cursor: "pointer",
      }}
      key={campaign._id}
      onClick={triggerSelectCampaign}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <TableCell
        component="th"
        scope="row"
        style={{
          color: "#282D43",
          fontSize: 13,
          fontFamily: "Poppins",
        }}
      >
        {campaign.protocol}
      </TableCell>
      <TableCell
        style={{
          color: "#282D43",
          fontSize: 13,
          fontFamily: "Poppins",
        }}
      >
        {campaign.title}
      </TableCell>
      <TableCell
        style={{
          color: "#282D43",
          fontSize: 13,
          fontFamily: "Poppins",
        }}
      >
        {campaign.reward}
      </TableCell>
      <TableCell
        style={{
          color: "#282D43",
          fontSize: 13,
          fontFamily: "Poppins",
        }}
      >
        {renderButton()}
      </TableCell>
      <TableCell>
        <ChevronRightIcon style={{ color: `${`rgba(175, 192, 216, 1)`}` }} />
      </TableCell>
    </TableRow>
  );
};

export default CustomTableRow;
