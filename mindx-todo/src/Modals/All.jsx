import React, { useContext } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { TodoContext } from "../context/TodoContext";
import "tailwindcss/tailwind.css";

const All = () => {
  const { submittedValues, onFinish, handleCheckboxChange, checkedValues } =
    useContext(TodoContext);
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onFinish(values, form);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
        layout="inline"
        onFinish={handleFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div style={{ display: "flex", width: "100%", gap: "8px" }}>
          <Form.Item
            name="task"
            style={{ flex: 1 }}
            rules={[
              {
                required: true,
                message: "Please input task!",
              },
            ]}
          >
            <Input style={{ width: "100%" }} placeholder="Add detail" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Add
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div className="flex flex-col items-start mt-4 w-full px-4 ">
        {submittedValues.map((value, index) => (
          <div
            style={{ marginTop: 8 }}
            key={index}
            className="flex items-center space-x-2 w-full mt-4"
          >
            <Checkbox
              style={{ marginRight: 6 }}
              checked={checkedValues[index] || false}
              onChange={() => handleCheckboxChange(index)}
            />
            <span
              className={`flex-1 ${checkedValues[index] ? "line-through" : ""}`}
              style={
                checkedValues[index] ? { textDecoration: "line-through" } : {}
              }
            >
              {value.task}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default All;
