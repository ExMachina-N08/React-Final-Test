import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { Button, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const Completed = () => {
  const {
    checkedItems,
    clearCompleted,
    handleCheckboxChange,
    submittedValues,
    checkedValues,
    setSubmittedValues,
    setCheckedValues,
  } = useContext(TodoContext);

  const handleDelete = (index) => {
    const remainingValues = submittedValues.filter((_, i) => i !== index);
    const updatedCheckedValues = Object.keys(checkedValues).reduce(
      (acc, key) => {
        if (parseInt(key, 10) !== index) {
          const newKey =
            parseInt(key, 10) > index ? parseInt(key, 10) - 1 : key;
          acc[newKey] = checkedValues[key];
        }
        return acc;
      },
      {}
    );
    setSubmittedValues(remainingValues);
    setCheckedValues(updatedCheckedValues);
    localStorage.setItem("submittedValues", JSON.stringify(remainingValues));
    localStorage.setItem("checkedValues", JSON.stringify(updatedCheckedValues));
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <ul style={{ width: "100%" }}>
        {checkedItems.map((item, index) => {
          const originalIndex = submittedValues.indexOf(item);
          return (
            <li
              key={originalIndex}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  marginRight: "8px",
                }}
              >
                <Checkbox
                  checked={checkedValues[originalIndex] || false}
                  onChange={() => handleCheckboxChange(originalIndex)}
                />
                <span
                  style={{
                    flex: 1,
                    textDecoration: "line-through",
                    marginLeft: "8px",
                  }}
                >
                  {item.task}
                </span>
              </div>
              <DeleteOutlined
                onClick={() => handleDelete(originalIndex)}
                style={{ cursor: "pointer" }}
              />
            </li>
          );
        })}
      </ul>
      {checkedItems.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            type="primary"
            size={"large"}
            danger
            onClick={clearCompleted}
            style={{
              marginTop: "8px",
            }}
          >
            <DeleteOutlined /> Delete All
          </Button>
        </div>
      )}
    </div>
  );
};

export default Completed;
