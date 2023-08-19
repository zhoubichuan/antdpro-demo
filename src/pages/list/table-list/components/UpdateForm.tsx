import React from 'react';
import { Modal } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import type { TableListItem } from '../data';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <ModalForm
      title="新建规则"
      width="400px"
      visible={props.updateModalVisible}
      onVisibleChange={() => props.onCancel()}
      onFinish={props.onSubmit}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '规则名称为必填项',
          },
        ]}
        width="md"
        label="name"
        name="name"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '规则名称为必填项',
          },
        ]}
        label="owner"
        width="md"
        name="owner"
      />
      <ProFormTextArea width="md" name="desc" label="desc" />
    </ModalForm>
  );
};

export default UpdateForm;
