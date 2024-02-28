import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from "@ant-design/pro-components";
import { Button, message } from "antd";
import { useState } from "react";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CustomForm = () => {
  const [loading, setLoading] = useState(false);
  return (
    <ProCard>
      <StepsForm
        onFinish={async () => {
          setLoading(true);
          await waitTime(1000);
          message.success("提交成功");
          setLoading(false);
        }}
        submitter={{
          render: ({ form, onSubmit, step, onPre }) => {
            return [
              <Button
                key="rest"
                onClick={() => {
                  form?.resetFields();
                }}
              >
                Rest
              </Button>,
              step > 0 && (
                <Button
                  key="pre"
                  onClick={() => {
                    onPre?.();
                  }}
                >
                  Pre
                </Button>
              ),
              <Button
                key="next"
                loading={loading}
                type="primary"
                onClick={() => {
                  onSubmit?.();
                }}
              >
                Next
              </Button>,
            ];
          },
        }}
        formProps={{
          validateMessages: {
            required: "此项为必填项",
          },
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="Title"
          onFinish={async () => {
            setLoading(true);
            await waitTime(2000);
            setLoading(false);
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="Name"
            width="md"
            tooltip="name is required"
            placeholder="Enter name"
            rules={[{ required: true }]}
          />
          <ProFormDatePicker name="date" label="Date" />
          <ProFormDateRangePicker name="DateTime" label="dateTime" />
          <ProFormTextArea
            name="remark"
            label="Date of birth"
            width="lg"
            placeholder="Date of birth"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="设置参数">
          <ProFormCheckbox.Group
            name="checkbox"
            label="迁移类型"
            width="lg"
            options={["结构迁移", "全量迁移", "增量迁移", "全量校验"]}
          />
          <ProForm.Group>
            <ProFormText name="dbName" label="业务 DB 用户名" />
            <ProFormDatePicker
              name="datetime"
              label="记录保存时间"
              width="sm"
            />
          </ProForm.Group>
          <ProFormDependency name={["dbName"]}>
            {({ dbName }) => {
              return (
                <ProFormCheckbox.Group
                  name="checkbox"
                  label="迁移类型"
                  options={
                    dbName
                      ? ["完整 LOB", "不同步 LOB", "受限制 LOB"]
                      : ["完整 LOB"]
                  }
                />
              );
            }}
          </ProFormDependency>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="发布实验">
          <ProFormCheckbox.Group
            name="checkbox"
            label="部署单元"
            rules={[
              {
                required: true,
              },
            ]}
            options={["部署单元1", "部署单元2", "部署单元3"]}
          />
          <ProFormSelect
            label="部署分组策略"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue="1"
            width="md"
            options={[
              {
                value: "1",
                label: "策略一",
              },
              { value: "2", label: "策略二" },
            ]}
          />
          <ProFormSelect
            label="Pod 调度策略"
            name="remark2"
            initialValue="2"
            width="md"
            options={[
              {
                value: "1",
                label: "策略一",
              },
              { value: "2", label: "策略二" },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};

export default CustomForm;
