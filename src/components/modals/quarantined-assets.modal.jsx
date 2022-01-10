import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleQuarantinedUnits } from "../../redux/modal/modal.actions";

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

const QuarantinedUnits = () => {
  const dispatch = useDispatch();

  const memberId = useSelector(state => state.memberState.memberId);

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "post",
        url: `/reports/quarantinedassets`,
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
        <CloseButton onClick={() => dispatch(toggleQuarantinedUnits())}>&times;</CloseButton>
        <Header>Quarantined Assets</Header>
        <TableContainer>
          {data ? (
            <Table cellSpacing="0">
              <thead>
                <TableRow>
                  <TableHeading>Asset Name</TableHeading>
                  <TableHeading>Asset Tag</TableHeading>
                  <TableHeading>Model</TableHeading>
                  <TableHeading>Serial</TableHeading>
                  <TableHeading>Comments</TableHeading>
                </TableRow>
              </thead>
              <TableBody>
                {data.map((unit) => (
                  <TableRow key={unit.id}>
                    <td>{unit.id}</td>
                    <td>{unit.name}</td>
                    <td>{unit.model}</td>
                    <td>{unit.serial}</td>
                    <td>{unit.comments}</td>
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

export default QuarantinedUnits;
