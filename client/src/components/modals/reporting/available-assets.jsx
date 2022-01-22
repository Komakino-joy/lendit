import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleAvailableUnits } from "../../../redux/modal/modal.actions";
import { httpFetchAvailableAssets } from "../../../services/api"

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
} from "../modal.styles";

import DownloadExcel from "../../download-excel/download-excel";

const AvailableAssets = () => {
  const dispatch = useDispatch();

  const memberId = useSelector(state => state.memberState.memberId);

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async (memberId) => {
      setData(await httpFetchAvailableAssets(memberId));
    };
    fetchData(memberId);
  }, [memberId]);

  return (
    <ModalMain>
      <ModalReportContent>
        <CloseButton onClick={() => dispatch(toggleAvailableUnits())}>&times;</CloseButton>
        <HeaderContainer>
          <Header>
            Available Assets
          </Header>
          { data && data[0] && 
            <DownloadExcelBtn>
              <DownloadExcel 
                data={data} 
                filename={'Available_assets'}
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

export default AvailableAssets;
