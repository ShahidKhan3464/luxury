import React from "react";
import Input from "../inputField";
import Select from "../selectField";
import Datepicker from '../datePicker';
import Textarea from '../textAreaField';

const Index = (props) => {
    const { control, ...rest } = props;
    switch (control) {
        case "input":
            return <Input {...rest} />;
        case "select":
            return <Select {...rest} />;
        case "textarea":
            return <Textarea {...rest} />;
        case "date":
            return <Datepicker {...rest} />;
        default:
            return null;
    }
};

export default Index;