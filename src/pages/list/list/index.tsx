import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Upload, Image, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
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
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { list, addList, updateList, removeList, exportList, getTemplate } from './service';
import type { TableListItem, TableListPagination } from './data';
import { useParams } from 'react-router';
import { history } from 'umi';
const XLSX = require('xlsx');
const handleExport = async (fields: TableListItem[]) => {
  const hide = message.loading('正在添加');
  try {
    await exportList(fields);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败！');
    return false;
  }
};
const uploadprops = {
  // 这里我们只接受excel2007以后版本的文件，accept就是指定文件选择框的文件类型
  accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  name: 'file',
  headers: {
    authorization: 'authorization-text',
  },
  showUploadList: false,
  // 把excel的处理放在beforeUpload事件，否则要把文件上传到通过action指定的地址去后台处理
  // 这里我们没有指定action地址，因为没有传到后台
  beforeUpload: (file: any, fileList: any) => {
    const rABS = true;
    const f = fileList[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      let dataResult = e.target.result;
      if (!rABS) dataResult = new Uint8Array(dataResult);
      const workbook = XLSX.read(dataResult, {
        type: rABS ? 'binary' : 'array',
      });
      // 假设我们的数据在第一个标签
      const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
      // XLSX自带了一个工具把导入的数据转成json
      const jsonArr = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 });
      // 通过自定义的方法处理Json,得到Excel原始数据传给后端，后端统一处理
      handleExport(jsonArr);
    };
    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
    return false;
  },
};
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

const handleDelete = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeList({
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

const TableList: React.FC = () => {
  const path: String = location.pathname.replace('/antdpro-demo', '');
  const [createManyModalVisible, handleManyModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [tabActiveKey, setTabActiveKey] = useState<any>(
    path.split('/')[path.split('/').length - 1],
  );
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const params: any = useParams();
  const [templateData, setTemplateData] = useState<any>([]);
  const getTemplateData = async (key: string) => {
    let template: any = [];
    if (path.includes('template')) {
      template = await require(`../${path.split('/')[2]}/${key}.json`);
    } else {
      const result = await getTemplate(key, path.split('/')[2]);
      template = result.data;
      for (let i = 0; i < template.length; i++) {
        const item = template[i];
        Object.keys(item).forEach((field: any) => {
          if (typeof item[field] === 'string') {
            if (item[field].includes('{}')) {
              template[i][field] = false;
            } else if (item[field].includes('{')) {
              template[i][field] = JSON.parse(item[field]);
            }
          }
        });
      }
    }
    setTemplateData(template);
  };
  useEffect(() => {
    getTemplateData(params.id);
  }, []);
  const handleOnTabChange = async (key: string) => {
    await getTemplateData(key);
    setTabActiveKey(key);
    if (actionRef.current) {
      actionRef.current.reload();
    }
    history.push(path.slice(0, -1) + key);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      width: 160,
      fixed: 'left',
      hideInSearch: true,
      hideInDescriptions: true,
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
    ...templateData.map((item: any) => ({
      ...item,
      render: (dom: any) => {
        if (!item.hideInTable && item.table && item.table.type === 'image') {
          if (Array.isArray(dom)) {
            return dom.map((i: any) => <Image height={100} src={i?.thumbUrl} />);
          } else {
            return <Image height={100} src={dom[0]?.thumbUrl} />;
          }
        }
        return dom;
      },
    })),
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 160,
      render: (_, record) => [
        <a
          key="config"
          onClick={async () => {
            const copyParams = {};
            templateData
              .filter((item: any) => item.create)
              .forEach((field: any) => {
                if (record[field.dataIndex]) {
                  copyParams[field.dataIndex] = record[field.dataIndex];
                }
              });
            const success = await handleAdd(copyParams as TableListItem);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          添加
        </a>,
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
            Modal.confirm({
              title: '删除数据',
              content: '确定删除该数据吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                await handleDelete([record] as TableListItem[]);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              },
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  const descriptions: ProColumns<TableListItem>[] = templateData
    .filter((item: any) => item.view)
    .map((item: any) => {
      const { width, view, ellipsis, ...rest } = item;
      return {
        ...rest,
        render: (text: any) => {
          if (!item.hideInTable && item.view && item.view.type === 'image') {
            if (Array.isArray(text)) {
              return text.map((i: any) => <Image height={300} src={i?.thumbUrl} />);
            } else {
              return <Image height={300} src={text[0]?.thumbUrl} />;
            }
          }
          return <div style={{ color: 'lightblue', whiteSpace: 'pre-line' }}>{text}</div>;
        },
      };
    });
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
        ghost: true,
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
        ghost={true}
        rowKey="id"
        search={{
          labelWidth: 100,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={(): any => {
              if (!selectedRowsState.length) {
                return message.warning('请选择数据');
              }
              Modal.confirm({
                title: '删除数据',
                content: '确定删除该数据吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                  await handleDelete(selectedRowsState);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
              });
            }}
          >
            <PlusOutlined /> 批量删除
          </Button>,
          <Upload
            {...uploadprops}
            onChange={() => {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          >
            <Button type="primary">批量导入</Button>
          </Upload>,
          // <Button
          //   type="primary"
          //   key="primary"
          //   onClick={() => {
          //     alert('导入');
          //   }}
          // >
          //   <PlusOutlined /> 导入
          // </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleManyModalVisible(true);
            }}
          >
            <PlusOutlined /> 批量添加
          </Button>,
        ]}
        request={list}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        options={{
          density: false,
          fullScreen: true,
          reload: true,
          setting: true,
        }}
        pagination={{
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '30', '40'],
          defaultPageSize: 10,
        }}
      />
      {createManyModalVisible && (
        <ModalForm
          title="JSON批量新增"
          width="800px"
          layout={'horizontal'}
          visible={createManyModalVisible}
          onVisibleChange={handleManyModalVisible}
          onFinish={async (data: any) => {
            const value = JSON.parse(data.content);
            for (let i = 0; i < value.length; i++) {
              const item = value[i];
              const success = await handleAdd(item as TableListItem);
              if (success) {
                handleManyModalVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }
          }}
        >
          <ProFormTextArea
            name="content"
            label="数据"
            placeholder="请输入JSON数据"
            colProps={{ span: 24 }}
          />
        </ModalForm>
      )}
      {createModalVisible && (
        <ModalForm
          {...formItemLayout}
          title="新增"
          width="800px"
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
                    <ProFormTextArea
                      {...item.create}
                      label={item.title}
                      name={item.dataIndex}
                      colProps={{ span: 24 }}
                    />
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
                case 'image':
                  form = (
                    <ProFormUploadButton
                      fieldProps={{
                        name: 'file',
                        listType: 'picture-card',
                      }}
                      action="/upload.do"
                      {...item.create}
                      label={item.title}
                      name={item.dataIndex}
                    />
                  );
                  break;
              }
              return form;
            })}
        </ModalForm>
      )}
      {updateModalVisible && (
        <ModalForm
          {...formItemLayout}
          title="编辑"
          width="800px"
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
                case 'image':
                  form = (
                    <ProFormUploadButton
                      fieldProps={{
                        name: 'file',
                        listType: 'picture-card',
                      }}
                      action="/upload.do"
                      {...item.create}
                      label={item.title}
                      name={item.dataIndex}
                    />
                  );
                  break;
              }
              return form;
            })}
        </ModalForm>
      )}
      <Drawer
        title={currentRow?.id}
        destroyOnClose
        closable={true}
        closeIcon={<CloseOutlined />}
        width={'80%'}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
      >
        {currentRow?.id && (
          <ProDescriptions<TableListItem>
            column={2}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={descriptions as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
