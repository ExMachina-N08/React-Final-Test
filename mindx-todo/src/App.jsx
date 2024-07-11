import React from "react";
import "./assets/css/App.css";
import { Tabs } from "antd";
import { Link, Outlet } from "react-router-dom";
import All from "./Modals/All";
import Active from "./Modals/Active";
import Completed from "./Modals/Completed";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: <Link to="/all">All</Link>,
    children: <All />,
  },
  {
    key: "2",
    label: <Link to="/active">Active</Link>,
    children: <Active />,
  },
  {
    key: "3",
    label: <Link to="/completed">Completed</Link>,
    children: <Completed />,
  },
];
const App = () => {
  return (
    <>
      <h1
        style={{
          marginBottom: 10,
          fontSize: 50,
        }}
        className="items-center lato-bold "
      >
        #todo
      </h1>

      <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered>
        {<Outlet />}
      </Tabs>
    </>
  );
};

export default App;
