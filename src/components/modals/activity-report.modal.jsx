import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { currentMemberId } from "../../redux/site-member/site-member.selectors";
import { toggleActvityReport } from "../../redux/modal/modal.actions";

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

const ActivityReport = ({
  toggleActvityReport,
  currentMemberId,
  startDate,
  endDate,
  userID,
  assetID,
}) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "post",
        url: "http://localhost:3000/reports/activitytracking",
        data: {
          id: currentMemberId,
          startDate: startDate,
          endDate: endDate,
          username: userID,
          assetID: assetID,
        },
      });
      setData(result.data);
    };

    fetchData(currentMemberId);
  }, [currentMemberId, startDate, endDate, userID, assetID]);

  return (
    <ModalMain>
      <ModalReportContent>
        <CloseButton onClick={toggleActvityReport}>&times;</CloseButton>
        <Header>Activity Tracking Report</Header>
        <TableContainer>
          {data ? (
            <Table cellSpacing="0">
              <thead>
                <TableRow>
                  <TableHeading>User ID</TableHeading>
                  <TableHeading>Asset ID</TableHeading>
                  <TableHeading>Asset Name</TableHeading>
                  <TableHeading>Asset Serial</TableHeading>
                  <TableHeading>Model</TableHeading>
                  <TableHeading>Comments</TableHeading>
                  <TableHeading>Action</TableHeading>
                  <TableHeading>Created DTTM</TableHeading>
                </TableRow>
              </thead>
              <TableBody>
                {data.map((data) => (
                  <TableRow key={data.id}>
                    <td>{data.user_id}</td>
                    <td>{data.asset_id}</td>
                    <td>{data.asset_name}</td>
                    <td>{data.asset_serial}</td>
                    <td>{data.model_name}</td>
                    <td>{data.comments}</td>
                    <td>{data.action}</td>
                    <td>{new Date(data.action_dttm).toLocaleString()}</td>
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
              style={{ position: "absolute", top: "20%", left: "50%", margin: "-25px 0 0 -25px" }}
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
  toggleActvityReport: () => dispatch(toggleActvityReport()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityReport);
