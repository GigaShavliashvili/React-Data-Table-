import React, { useEffect,useState } from "react";
import { useTableStore } from "./zustand/store";
import styled from "styled-components";
import Table from "./components/Table";
import AddModal from "./components/AddModal";
import PieChart from "./components/PieChart";


interface Row {
  id: number | string;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

const App:React.FC = () => {
  
  //get table data
  const fetchData = useTableStore((state) => state.fetchData);

  //proxy is "http://localhost:5000" ...
  useEffect(() => {
    fetchData("/table");
  }, []);

  return (
    <MainContainer>
      <Flex>
        <PieChart />
      </Flex>
      <Table/>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  padding: 2%;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default App;
