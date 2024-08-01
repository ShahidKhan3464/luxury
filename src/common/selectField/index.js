import React from "react";
import { Select } from "antd";
import ErrorMsg from "../fieldErrorMessage";
import { Field, ErrorMessage } from "formik";
import { SelectFieldContainer } from "./style";

const Index = (props) => {
  const { name, value, placeholder, onSelect, defaultValue, label, options, ...rest } = props;

  const OptionsArr = options?.map((option) => {
    return (
      <Select.Option key={option.id} value={option.name}>
        {option.name}
      </Select.Option>
    );
  });

  return (
    <SelectFieldContainer>
      <Field name={name} id={name} {...rest}>
        {({ field, form, meta }) => {
          return (
            <div className="custom-select-inner">
              <Select
                {...rest}
                id={name}
                name={name}
                value={value}
                bordered={true}
                className="customSelect"
                maxTagPlaceholder={null}
                placeholder={placeholder}
                // defaultValue={defaultValue}
                onSelect={((val, event) => onSelect(val, event.key))}
                onChange={(val) => { form.setFieldValue(name, val) }}
              >
                {OptionsArr}
              </Select>
            </div>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={ErrorMsg} />
    </SelectFieldContainer>
  );
};

export default Index;