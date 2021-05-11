import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { currentMemberId } from "../../redux/site-member/site-member.selectors";
import { seenAvailableAssets } from "../../redux/modal/modal.selectors";
import { toggleAvailableUnits } from "../../redux/modal/modal.actions";

import axios from "axios";
import { API_URL } from "../../services/api.js";

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

const AvailableUnits = ({ toggleAvailableUnits, memberId }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "post",
        url: `${API_URL}/reports/availableassets`,
        data: {
          memberId: memberId,
        },
      });
      setData(result.data);
    };

    fetchData(memberId);
  }, [memberId]);

  return (
    <ModalMain>
      <ModalReportContent>
        <CloseButton onClick={toggleAvailableUnits}>&times;</CloseButton>
        <Header>Available Units</Header>
        <TableContainer>
          {data ? (
            <Table cellSpacing="0">
              <thead>
                <TableRow>
                  <TableHeading>Asset ID</TableHeading>
                  <TableHeading>Asset Name</TableHeading>
                  <TableHeading>Model</TableHeading>
                  <TableHeading>Serial</TableHeading>
                </TableRow>
              </thead>
              <TableBody>
                {data.map((unit) => (
                  <TableRow key={unit.id}>
                    <td>{unit.id}</td>
                    <td>{unit.name}</td>
                    <td>{unit.model}</td>
                    <td>{unit.serial}</td>
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
                top: "20%",
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
  memberId: currentMemberId,
  seenAvailableAssets,
});

const mapDispatchToProps = (dispatch) => ({
  toggleAvailableUnits: () => dispatch(toggleAvailableUnits()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailableUnits);
