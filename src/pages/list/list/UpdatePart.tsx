import { message } from 'antd';
import React from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch,
  ProFormSelect,
  ProFormRadio,
} from '@ant-design/pro-form';
import { updateList } from './service';
import type { TableListItem } from './data';
export type UpdatePartProps = {
  onVisibleChange: (e?: any) => void;
  onFinish: (e?: any) => void;
  data: any;
  template: any;
};
const UpdatePart: React.FC<UpdatePartProps> = (props) => {
  const { data, template = [], onVisibleChange, onFinish } = props;
  const handleEdit = async (fields: TableListItem) => {
    const hide = message.loading('正在配置');
    try {
      await updateList({ ...fields });
      hide();
      message.success('修改成功');
      return true;
    } catch (error) {
      hide();
      message.error('修改失败！');
      return false;
    }
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 3 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 21 },
      sm: { span: 20 },
    },
  };
  return (
    <ModalForm
      {...formItemLayout}
      title="编辑"
      width="800px"
      layout={'horizontal'}
      visible={true}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        if (value.images) {
          value.images = [value.images];
        }
        const success = await handleEdit(value as TableListItem);
        if (success) {
          onFinish();
        }
      }}
      initialValues={data}
    >
      {template
        .filter((item: any) => item.edit)
        .map((item: any) => {
          let form = <ProFormText {...item.edit} label={item.title} name={item.dataIndex} />;
          switch (item.edit ? item.edit.type || '' : '') {
            case 'input':
              form = <ProFormText {...item.edit} label={item.title} name={item.dataIndex} />;
              break;
            case 'textArea':
              form = <ProFormTextArea {...item.edit} label={item.title} name={item.dataIndex} />;
              break;
            case 'select':
              form = <ProFormSelect {...item.edit} label={item.title} name={item.dataIndex} />;
              break;
            case 'radio':
              form = (
                <ProFormRadio.Group {...item.create} label={item.title} name={item.dataIndex} />
              );
              break;
            case 'switch':
              form = <ProFormSwitch {...item.edit} label={item.title} name={item.dataIndex} />;
              break;
              // case 'image':
              //   form = (
              //     <ProFormUploadButton
              //       fieldProps={{
              //         name: 'file',
              //         listType: 'picture-card',
              //       }}
              //       action="/upload.do"
              //       {...item.create}
              //       label={item.title}
              //       name={item.dataIndex}
              //     />
              //   );
              break;
          }
          return form;
        })}
    </ModalForm>
  );
};

export default UpdatePart;
