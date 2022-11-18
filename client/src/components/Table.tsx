import React, { useState } from "react";
import DataTable, {
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";
import { useTableStore } from "../zustand/store";
import { Button, Modal } from "reactstrap";
import AddModal from "./AddModal";

interface Row {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

const Table = () => {

   
    
  const data = useTableStore((state) => state.data);
  const loading = useTableStore((state) => state.loading);
  const hasErrors = useTableStore((state) => state.hasErrors);
  const removeRow = useTableStore((state) => state.removeRow);

  const columns: TableColumn<Row>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => `${row.address.city}, ${row.address.street}`,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          onClick={() => {
            deleteRow(row.id);
          }}
          size="sm"
          color="danger"
        >
          Delete
        </Button>
      ),
    },
  ];

  //deleting row from table using zustand
  const deleteRow = (id: number) => {
    removeRow(id);
  };


   const getRowdata = useTableStore((state:any) => state.getRowdata);
  //Row double click
  const editRow = (row: Row) => {
  console.log(row);
  getRowdata(row)
  };

  return (
    <>
      <DataTable
        title="User List"
        columns={columns}
        data={data}
        pagination
        onRowDoubleClicked={(e) => {
          editRow(e);
        }}
      />
    </>
  );
};

export default Table;
