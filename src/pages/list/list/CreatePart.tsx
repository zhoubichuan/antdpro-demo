import { message } from 'antd';
import React, { useState } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch,
  ProFormSelect,
  ProFormRadio,
} from '@ant-design/pro-form';
import { addList } from './service';
import type { TableListItem } from './data';
export type CreatePartProps = {
  onVisibleChange: (e?: any) => void;
  onFinish: (e?: any) => void;
  template: any;
};
const CreatePart: React.FC<CreatePartProps> = (props) => {
  const { template = [], onVisibleChange, onFinish } = props;
  const [createModalVisible, handleModalVisible] = useState<boolean>(true);
  const handleAdd = async (fields: TableListItem) => {
    const hide = message.loading('正在添加');
    try {
      await addList({ ...fields });
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败！');
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
      title="新增"
      width="800px"
      layout={'horizontal'}
      visible={createModalVisible}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        if (value.images) {
          value.images = [value.images];
        }
        const success = await handleAdd(value as TableListItem);
        if (success) {
          onFinish();
          handleModalVisible(false);
        }
      }}
    >
      {template
        .filter((item: any) => item.create && JSON.stringify(item.create) !== '{}')
        .map((item: any) => {
          let form = <ProFormText {...item.create} label={item.title} name={item.dataIndex} />;
          switch (item.create ? item.create.type || '' : '') {
            case 'input':
              form = <ProFormText {...item.create} label={item.title} name={item.dataIndex} />;
              break;
            case 'textArea':
              form = (
                <ProFormTextArea
                  {...item.create}
                  label={item.title}
                  name={item.dataIndex}
                  colProps={{ span: 24 }}
                />
              );
              break;
            case 'select':
              form = <ProFormSelect {...item.create} label={item.title} name={item.dataIndex} />;
              break;
            case 'radio':
              form = (
                <ProFormRadio.Group {...item.create} label={item.title} name={item.dataIndex} />
              );
              break;
            case 'switch':
              form = <ProFormSwitch {...item.create} label={item.title} name={item.dataIndex} />;
            //   case 'image':
            //     form = (
            //       <ProFormUploadButton
            //         fieldProps={{
            //           name: 'file',
            //           listType: 'picture-card',
            //         }}
            //         action="/upload.do"
            //         {...item.create}
            //         label={item.title}
            //         name={item.dataIndex}
            //       />
            //     );
            //     break;
          }
          return form;
        })}
    </ModalForm>
  );
};

export default CreatePart;
