import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";

import { toggleMultipleUnitsInUse } from "../../redux/modal/modal.actions";

import axios from "axios";

import DownloadExcel from "../download-excel/download-excel";
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
  HeaderContainer,
  DownloadExcelBtn
} from "./modal.styles";

const MultipleAssetsInUse = () => {
  const dispatch = useDispatch();
  const currentMemberId = useSelector(state => state.memberState.memberId)
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "post",
        url: `/reports/multipleassets`,
        data: {
          memberId: currentMemberId,
        },
      });

      setData(result.data);
    };

    fetchData(currentMemberId);
  }, [currentMemberId]);

  const handleOnClose = (e) => {
    e.preventDefault()
    dispatch(toggleMultipleUnitsInUse())
  }

  return (
    <ModalMain>
      <ModalReportContent>
        <CloseButton onClick={handleOnClose}>&times;</CloseButton>
        <HeaderContainer>
          <Header>
            Users with multiple assets
          </Header>
          { data && data[0] && 
            <DownloadExcelBtn>
              <DownloadExcel 
                data={data} 
                filename={'Users_with_multiple_assets'}
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
                  <TableHeading>Full Name</TableHeading>
                  <TableHeading>Total Assets</TableHeading>
                </TableRow>
              </thead>
              <TableBody>
                {data.map((user) => (
                  <TableRow key={user.in_use_by} >
                    <td>{user.in_use_by}</td>
                    <td>{user.full_name}</td>
                    <td>{user.count}</td>
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

export default MultipleAssetsInUse;
