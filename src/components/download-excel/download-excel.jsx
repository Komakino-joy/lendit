import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DownloadExcel = ({data, filename}) => {

    return (
        <ExcelFile filename={filename}>
            <ExcelSheet data={data} name={filename}>
            {
                Object.keys(data[0]).map(key => (
                    <ExcelColumn key={key} label={key} value={key}/>
                ))
            }
            </ExcelSheet>
        </ExcelFile>
    );
}

export default DownloadExcel;