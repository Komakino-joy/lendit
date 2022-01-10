import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleUnitsInUse } from "../../redux/modal/modal.actions";

import axios from "axios";

import DownloadExcel from "../download-excel/download-excel";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
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
  DownloadExcelBtn
} from "./modal.styles";

const UnitsInUse = () => {
  const dispatch = useDispatch();

  const memberId = useSelector(state => state.memberState.memberId);

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "post",
        url: `/reports/assetsinuse`,
        data: {
          memberId: memberId,
        },
      });

      setData(result.data);
    };

    fetchData(memberId);
  }, [memberId]);

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
        <CloseButton onClick={() => dispatch(toggleUnitsInUse())}>&times;</CloseButton>
        <HeaderContainer>
          <Header>
            Assets in Use
          </Header>
          { data && data[0] && 
            <DownloadExcelBtn>
              <DownloadExcel 
                data={data} 
                filename={'Assets_in_use'}
              />
            </DownloadExcelBtn>
          }  
        </HeaderContainer>
        <TableContainer>
          {data ? (
            <Table cellSpacing="0">
              <thead>
                <TableRow>
                  <TableHeading>Asset Name</TableHeading>
                  <TableHeading>Asset Tag</TableHeading>
                  <TableHeading>Model</TableHeading>
                  <TableHeading>Serial</TableHeading>
                  <TableHeading>User</TableHeading>
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
                    <td style={ calculateHours(unit.last_checkout) > 12 ? overDueStyles : {}}>{unit.full_name}</td>
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

export default UnitsInUse;
