import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProCard, ProForm, ProFormCheckbox, ProFormDatePicker, ProFormDateRangePicker, ProFormDependency, ProFormSelect, ProFormText, ProFormTextArea, StepsForm, } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { useState } from "react";
const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
const CustomForm = () => {
    const [loading, setLoading] = useState(false);
    return (_jsx(ProCard, { children: _jsxs(StepsForm, { onFinish: async () => {
                setLoading(true);
                await waitTime(1000);
                message.success("提交成功");
                setLoading(false);
            }, submitter: {
                render: ({ form, onSubmit, step, onPre }) => {
                    return [
                        _jsx(Button, { onClick: () => {
                                form?.resetFields();
                            }, children: "Rest" }, "rest"),
                        step > 0 && (_jsx(Button, { onClick: () => {
                                onPre?.();
                            }, children: "Pre" }, "pre")),
                        _jsx(Button, { loading: loading, type: "primary", onClick: () => {
                                onSubmit?.();
                            }, children: "Next" }, "next"),
                    ];
                },
            }, formProps: {
                validateMessages: {
                    required: "此项为必填项",
                },
            }, children: [_jsxs(StepsForm.StepForm, { name: "base", title: "Title", onFinish: async () => {
                        setLoading(true);
                        await waitTime(2000);
                        setLoading(false);
                        return true;
                    }, children: [_jsx(ProFormText, { name: "name", label: "Name", width: "md", tooltip: "name is required", placeholder: "Enter name", rules: [{ required: true }] }), _jsx(ProFormDatePicker, { name: "date", label: "Date" }), _jsx(ProFormDateRangePicker, { name: "DateTime", label: "dateTime" }), _jsx(ProFormTextArea, { name: "remark", label: "Date of birth", width: "lg", placeholder: "Date of birth" })] }), _jsxs(StepsForm.StepForm, { name: "checkbox", title: "\u8BBE\u7F6E\u53C2\u6570", children: [_jsx(ProFormCheckbox.Group, { name: "checkbox", label: "\u8FC1\u79FB\u7C7B\u578B", width: "lg", options: ["结构迁移", "全量迁移", "增量迁移", "全量校验"] }), _jsxs(ProForm.Group, { children: [_jsx(ProFormText, { name: "dbName", label: "\u4E1A\u52A1 DB \u7528\u6237\u540D" }), _jsx(ProFormDatePicker, { name: "datetime", label: "\u8BB0\u5F55\u4FDD\u5B58\u65F6\u95F4", width: "sm" })] }), _jsx(ProFormDependency, { name: ["dbName"], children: ({ dbName }) => {
                                return (_jsx(ProFormCheckbox.Group, { name: "checkbox", label: "\u8FC1\u79FB\u7C7B\u578B", options: dbName
                                        ? ["完整 LOB", "不同步 LOB", "受限制 LOB"]
                                        : ["完整 LOB"] }));
                            } })] }), _jsxs(StepsForm.StepForm, { name: "time", title: "\u53D1\u5E03\u5B9E\u9A8C", children: [_jsx(ProFormCheckbox.Group, { name: "checkbox", label: "\u90E8\u7F72\u5355\u5143", rules: [
                                {
                                    required: true,
                                },
                            ], options: ["部署单元1", "部署单元2", "部署单元3"] }), _jsx(ProFormSelect, { label: "\u90E8\u7F72\u5206\u7EC4\u7B56\u7565", name: "remark", rules: [
                                {
                                    required: true,
                                },
                            ], initialValue: "1", width: "md", options: [
                                {
                                    value: "1",
                                    label: "策略一",
                                },
                                { value: "2", label: "策略二" },
                            ] }), _jsx(ProFormSelect, { label: "Pod \u8C03\u5EA6\u7B56\u7565", name: "remark2", initialValue: "2", width: "md", options: [
                                {
                                    value: "1",
                                    label: "策略一",
                                },
                                { value: "2", label: "策略二" },
                            ] })] })] }) }));
};
export default CustomForm;
