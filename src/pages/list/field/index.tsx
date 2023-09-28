import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch,
  ProFormSelect,
  ProFormRadio,
} from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { rule, addRule, updateRule, removeRule } from './service';
import type { TableListItem, TableListPagination } from './data';
import { useParams } from 'react-router';
import { history } from 'umi';

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败！');
    return false;
  }
};

const handleEdit = async (fields: TableListItem) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({ ...fields });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败！');
    return false;
  }
};

const handleDelete = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      id: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [tabActiveKey, setTabActiveKey] = useState<any>(location.href.slice(-1));
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const params: any = useParams();
  const templateData: any = require('./' + params.id + '.json');
  const handleOnTabChange = (key: string) => {
    setTabActiveKey(key);
    if (actionRef.current) {
      actionRef.current.reload();
    }
    history.push('/list/field/' + key);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    ...templateData.filter((item: any) => item.table),
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalVisible(true);
          }}
        >
          修改
        </a>,
        <a
          key="subscribeAlert"
          onClick={() => {
            handleDelete([record] as TableListItem[]);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer
      style={{
        height: `calc(100vh - 208px)`,
        display: 'flex',
        flexDirection: 'column',
      }}
      onTabChange={handleOnTabChange}
      header={{
        title: false,
      }}
      tabList={[
        {
          tab: '列表1',
          key: '1',
        },
        {
          tab: '列表2',
          key: '2',
        },
        {
          tab: '列表3',
          key: '3',
        },
        {
          tab: '列表4',
          key: '4',
        },
        {
          tab: '列表5',
          key: '5',
        },
        {
          tab: '列表6',
          key: '6',
        },
        {
          tab: '列表7',
          key: '7',
        },
        {
          tab: '列表8',
          key: '8',
        },
      ]}
      tabActiveKey={tabActiveKey}
    >
      <ProTable<TableListItem, TableListPagination>
        style={{ height: '100%' }}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleDelete(selectedRowsState);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          >
            <PlusOutlined /> 批量删除
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              alert('导入');
            }}
          >
            <PlusOutlined /> 导入
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {createModalVisible && (
        <ModalForm
          title="新增"
          width="400px"
          layout={'horizontal'}
          visible={createModalVisible}
          onVisibleChange={handleModalVisible}
          onFinish={async (value) => {
            const success = await handleAdd(value as TableListItem);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          {templateData
            .filter((item: any) => item.create)
            .map((item: any) => {
              let form = <ProFormText {...item.create} label={item.title} name={item.dataIndex} />;
              switch (item.create ? item.create.type || '' : '') {
                case 'input':
                  form = <ProFormText {...item.create} label={item.title} name={item.dataIndex} />;
                  break;
                case 'textArea':
                  form = (
                    <ProFormTextArea {...item.create} label={item.title} name={item.dataIndex} />
                  );
                  break;
                case 'select':
                  form = (
                    <ProFormSelect {...item.create} label={item.title} name={item.dataIndex} />
                  );
                  break;
                case 'radio':
                  form = <ProFormRadio {...item.create} label={item.title} name={item.dataIndex} />;
                  break;
                case 'switch':
                  form = (
                    <ProFormSwitch {...item.create} label={item.title} name={item.dataIndex} />
                  );
                  break;
              }
              return form;
            })}
        </ModalForm>
      )}
      {updateModalVisible && (
        <ModalForm
          title="编辑"
          width="400px"
          layout={'horizontal'}
          visible={updateModalVisible}
          onVisibleChange={handleUpdateModalVisible}
          onFinish={async (value) => {
            const success = await handleEdit(value as TableListItem);
            if (success) {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          initialValues={currentRow}
        >
          {templateData
            .filter((item: any) => item.edit)
            .map((item: any) => {
              let form = <ProFormText {...item.edit} label={item.title} name={item.dataIndex} />;
              switch (item.edit ? item.edit.type || '' : '') {
                case 'input':
                  form = <ProFormText {...item.edit} label={item.title} name={item.dataIndex} />;
                  break;
                case 'textArea':
                  form = (
                    <ProFormTextArea {...item.edit} label={item.title} name={item.dataIndex} />
                  );
                  break;
                case 'select':
                  form = <ProFormSelect {...item.edit} label={item.title} name={item.dataIndex} />;
                  break;
                case 'radio':
                  form = <ProFormRadio {...item.edit} label={item.title} name={item.dataIndex} />;
                  break;
                case 'switch':
                  form = <ProFormSwitch {...item.edit} label={item.title} name={item.dataIndex} />;
                  break;
              }
              return form;
            })}
        </ModalForm>
      )}
      <Drawer
        destroyOnClose
        closeIcon={<CloseOutlined />}
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
