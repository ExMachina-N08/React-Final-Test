import React, { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [submittedValues, setSubmittedValues] = useState(() => {
    const savedValues = localStorage.getItem("submittedValues");
    return savedValues ? JSON.parse(savedValues) : [];
  });

  const [checkedValues, setCheckedValues] = useState(() => {
    const savedChecked = localStorage.getItem("checkedValues");
    return savedChecked ? JSON.parse(savedChecked) : {};
  });

  const onFinish = (values, form) => {
    const updatedValues = [...submittedValues, values];
    setSubmittedValues(updatedValues);
    localStorage.setItem("submittedValues", JSON.stringify(updatedValues));
    form.resetFields();
  };

  const handleCheckboxChange = (index) => {
    const updatedChecked = {
      ...checkedValues,
      [index]: !checkedValues[index],
    };
    setCheckedValues(updatedChecked);
    localStorage.setItem("checkedValues", JSON.stringify(updatedChecked));
  };

  const clearCompleted = () => {
    const remainingValues = submittedValues.filter(
      (_, index) => !checkedValues[index]
    );
    setSubmittedValues(remainingValues);
    setCheckedValues({});
    localStorage.setItem("submittedValues", JSON.stringify(remainingValues));
    localStorage.setItem("checkedValues", JSON.stringify({}));
  };

  const checkedItems = submittedValues.filter(
    (_, index) => checkedValues[index]
  );
  const activeItems = submittedValues.filter(
    (_, index) => !checkedValues[index]
  );

  return (
    <TodoContext.Provider
      value={{
        submittedValues,
        setSubmittedValues,
        onFinish,
        handleCheckboxChange,
        checkedValues,
        setCheckedValues,
        checkedItems,
        activeItems,
        clearCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
