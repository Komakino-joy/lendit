import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { currentMemberId } from "../../redux/site-member/site-member.selectors";
import { toggleUnitsInUse } from "../../redux/modal/modal.actions";

import axios from "axios";

import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  ModalMain,
  ModalReportContent,
  CloseButton,
  Header,
  TableContainer,
  Table,
  TableHeading,
  TableRow,
  TableBody,
} from "./modal.styles";

const UnitsInUse = ({ toggleUnitsInUse, currentMemberId }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "post",
        url: `/reports/assetsinuse`,
        data: {
          memberId: currentMemberId,
        },
      });

      setData(result.data);
    };

    fetchData(currentMemberId);
  }, [currentMemberId]);

  const overDueStyles = {
      background: '#f2645a', 
      color:'white', 
      fontWeight: 'bold' 
  }

  const calculateHours = (timestamp) => {
    return Math.floor(
      (Date.now() - Date.parse(timestamp)) /
        (1000 * 60 * 60))
  }

  return (
    <ModalMain>
      <ModalReportContent>
        <CloseButton onClick={toggleUnitsInUse}>&times;</CloseButton>
        <Header>Assets in Use</Header>
        <TableContainer>
          {data ? (
            <Table cellSpacing="0">
              <thead>
                <TableRow>
                  <TableHeading>Asset ID</TableHeading>
                  <TableHeading>Asset Name</TableHeading>
                  <TableHeading>Model</TableHeading>
                  <TableHeading>Serial</TableHeading>
                  <TableHeading>Status</TableHeading>
                  <TableHeading>Time out (hrs)</TableHeading>
                </TableRow>
              </thead>
              <TableBody>
                {data.map((unit) => (
                  <TableRow key={unit.id} >
                    <td style={ calculateHours(unit.last_checkout) > 12 ? overDueStyles : {}}>{unit.id}</td>
                    <td style={ calculateHours(unit.last_checkout) > 12 ? overDueStyles : {}}>{unit.name}</td>
                    <td style={ calculateHours(unit.last_checkout) > 12 ? overDueStyles : {}}>{unit.model}</td>
                    <td style={ calculateHours(unit.last_checkout) > 12 ? overDueStyles : {}}>{unit.serial}</td>
                    <td style={ calculateHours(unit.last_checkout) > 12 ? overDueStyles : {}}>{unit.status}</td>
                    <td style={ calculateHours(unit.last_checkout) > 12 ? overDueStyles : {}}>{calculateHours(unit.last_checkout)}</td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Loader
              type="Puff"
              color="#4178BE"
              height={70}
              width={70}
              className="loader"
              style={{
                position: "absolute",
                top: "25%",
                left: "50%",
                margin: "-25px 0 0 -25px",
              }}
            />
          )}
        </TableContainer>
      </ModalReportContent>
    </ModalMain>
  );
};

const mapStateToProps = createStructuredSelector({
  currentMemberId,
});

const mapDispatchToProps = (dispatch) => ({
  toggleUnitsInUse: () => dispatch(toggleUnitsInUse()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnitsInUse);
