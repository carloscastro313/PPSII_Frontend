import React from "react";
import Button from "../Button/Button";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";

const ExcelExport = ({ lista = [], filename = "" }) => {
  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(lista);
    const excelBuffer = XLSX.write(
      { Sheets: { data: ws }, SheetNames: ["data"] },
      { bookType: "xlsx", type: "array" }
    );
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UFT-8",
    });
    FileSaver.saveAs(data, filename + ".xlsx");
  };

  return (
    <>
      <Button
        name="Exportar"
        onClickEvent={() => {
          exportToExcel();
        }}
        cssClass="bg-green-900 hover:bg-green-600 text-white"
      />
    </>
  );
};

export default ExcelExport;
