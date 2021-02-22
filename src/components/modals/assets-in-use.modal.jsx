import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { currentMemberId } from "../../redux/site-member/site-member.selectors";
import { toggleUnitsInUse } from "../../redux/modal/modal.actions";

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
        url: "https://lendit-api.herokuapp.com/assetsinuse",
        data: {
          memberId: currentMemberId,
        },
      });

      setData(result.data);
    };

    fetchData(currentMemberId);
  }, [currentMemberId]);

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
                  <TableRow key={unit.id}>
                    <td>{unit.id}</td>
                    <td>{unit.name}</td>
                    <td>{unit.model}</td>
                    <td>{unit.serial}</td>
                    <td>{unit.status}</td>
                    {/* Calculating hours since check out */}
                    <td>
                      {Math.floor(
                        (Date.now() - Date.parse(unit.last_checkout)) /
                          (1000 * 60 * 60)
                      )}
                    </td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Loader
              type="Puff"
              color="#966eff"
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
  currentMemberId,
});

const mapDispatchToProps = (dispatch) => ({
  toggleUnitsInUse: () => dispatch(toggleUnitsInUse()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnitsInUse);
