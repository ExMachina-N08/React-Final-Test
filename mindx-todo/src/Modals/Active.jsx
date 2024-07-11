import React, { useContext } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { TodoContext } from "../context/TodoContext";
import "tailwindcss/tailwind.css";

const Active = () => {
  const {
    activeItems,
    onFinish,
    handleCheckboxChange,
    submittedValues,
    checkedValues,
  } = useContext(TodoContext);
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
      <div className="mt-4">
        <ul>
          {activeItems.map((item, index) => {
            const originalIndex = submittedValues.indexOf(item);
            return (
              <li
                style={{ marginTop: 8 }}
                key={originalIndex}
                className="flex items-center space-x-2 w-full "
              >
                <Checkbox
                  style={{ marginRight: 6 }}
                  checked={checkedValues[originalIndex] || false}
                  onChange={() => handleCheckboxChange(originalIndex)}
                />
                {item.task}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Active;
