import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleActvityReport } from "../../../../redux/modal/modal.actions";

import axios from "axios";

import DownloadExcel from "../../../download-excel/download-excel";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  DownloadExcelBtn,
  ModalMain,
  ModalReportContent,
  CloseButton,
  HeaderContainer,
  Header,
  TableContainer,
  Table,
  TableHeading,
  TableRow,
  TableBody,
} from "../../modal.styles";

const ActivityReport = ({
  startDate,
  endDate,
  userID,
  assetID,
}) => {
  const dispatch = useDispatch();
  const memberId = useSelector(state => state.memberState.memberId);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "post",
        url: `/reports/activitytracking`,
        data: {
          id: memberId,
          startDate: startDate,
          endDate: endDate,
          username: userID,
          assetID: assetID,
        },
      });
      setData(result.data);
    };

    fetchData(memberId);
  }, [memberId, startDate, endDate, userID, assetID]);

  return (
    <ModalMain>
      <ModalReportContent>  
        <CloseButton onClick={() => dispatch(toggleActvityReport())}>&times;</CloseButton>
        <HeaderContainer>
        <Header>
          Activity Tracking Report
        </Header>
        { data && data[0] && 
          <DownloadExcelBtn>
            <DownloadExcel 
              data={data} 
              filename={'Activity_tracking'}
            />
          </DownloadExcelBtn>
        }  
      </HeaderContainer>
        <TableContainer>
          {data ? (
            <Table cellSpacing="0">
              <thead>
                <TableRow>
                  <TableHeading>User ID</TableHeading>
                  <TableHeading>Asset Name</TableHeading>
                  <TableHeading>Asset Tag</TableHeading>
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


export default ActivityReport;
