import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Upload, Image, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import {
  requestTabs,
  requestList,
  removeList,
  importList,
  getTemplate,
  exportList,
  addList,
} from './service';
import type { TableListItem, TableListPagination } from './data';
import { useParams } from 'react-router';
import { history } from 'umi';
import moment from 'moment';
import classNames from 'classnames';
import styles from './index.less';
import SliderPart from './SliderPart';
import UpdatePart from './UpdatePart';
import CreatePart from './CreatePart';
const TableList: React.FC = () => {
  const XLSX = require('xlsx');
  const handleExport = async (fields: TableListItem[]) => {
    const hide = message.loading('正在添加');
    try {
      await importList(fields);
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
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
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
        const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonArr = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 });
        handleExport(jsonArr);
      };
      if (rABS) reader.readAsBinaryString(f);
      else reader.readAsArrayBuffer(f);
      return false;
    },
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
  const path: string = location.pathname.replace('/antdpro-demo', '');
  const [createManyModalVisible, handleManyModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [tabActiveKey, setTabActiveKey] = useState<any>(
    path.split('/')[path.split('/').length - 1],
  );
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const params: any = useParams();
  const [tabs, setTabs] = useState<any>([]);
  const [templateData, setTemplateData] = useState<any>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
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
  const getTemplateData = async (key: string) => {
    let template: any = [];
    if (path.includes('template') || path.includes('backend') || path.includes('tab')) {
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
    const tabsData = await requestTabs({});
    setTabs(tabsData.data);
    if (location.href.includes('id')) {
      const arr = location.href.split('?id=');
      const id: string = arr[arr.length - 1];
      const result = await requestList({ current: 1, pageSize: 1 }, { id });
      setOptions(result.data);
    }
  };
  const handleOnSearch = async () => {
    const { data } = await requestList({ current: 1 });
    setOptions(data);
  };
  useEffect(() => {
    getTemplateData(params.id);
    handleOnSearch();
  }, [params.id]);
  const handleOnTabChange = async (key: string) => {
    // await getTemplateData(key);
    // setTabActiveKey(key);
    // if (actionRef.current) {
    //   actionRef.current.reload();
    // }
    history.push(path.slice(0, -1) + key);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      width: 160,
      fixed: 'left',
      align: 'center',
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
    ...templateData.map((item: any) => {
      item.hideInSearch = !item.search || JSON.stringify(item.search) === '{}';
      item.hideInTable = !item.table || JSON.stringify(item.table) === '{}';
      return {
        ...item,
        defaultSortOrder: 'descend',
        sorter: (a: any, b: any) => a[item.dataIndex] - b[item.dataIndex],
        ...item.table,
        renderFormItem: () => {
          if (item.search && item.search.type === 'select') {
            return (
              <ProFormSelect
                name={item.dataIndex}
                options={[...new Set(options.map((o: any) => o[item.dataIndex]))].map(
                  (name: string) => ({
                    label: name,
                    value: name,
                  }),
                )}
              />
            );
          } else {
            return <ProFormText name={item.dataIndex} />;
          }
        },
        render: (dom: any) => {
          if (!item.hideInTable && item.table && item.table.type === 'image') {
            if (Array.isArray(dom)) {
              return dom.map((i: any, key) => <Image height={100} src={i} key={key} />);
            } else {
              return <Image height={100} src={dom} />;
            }
          }
          if (!item.hideInTable && item.table && item.table.type === 'radio') {
            return item.table.options.find((i: any) => i.value === dom)?.label;
          }
          if (!item.hideInTable && item.table && item.table.type === 'time') {
            return <div style={{ whiteSpace: 'pre-line' }}>{moment(dom).fromNow()}</div>;
          }
          return dom;
        },
      };
    }),
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 160,
      render: (_, record: any) => [
        <a
          key="add"
          onClick={async () => {
            const copyParams: any = {};
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
          key="edit"
          onClick={() => {
            const obj: any = {};
            for (const key in record) {
              if (typeof record[key] === 'object') {
                obj[key] = JSON.stringify(record[key]);
              } else {
                obj[key] = record[key];
              }
            }
            setCurrentRow(obj);
            handleUpdateModalVisible(true);
          }}
        >
          修改
        </a>,
        <a
          key="delete"
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

  return (
    <PageContainer
      className={classNames('container-part', styles['container-part'])}
      onTabChange={handleOnTabChange}
      header={{
        title: false,
        ghost: true,
      }}
      tabList={
        location.pathname.includes('tab')
          ? []
          : tabs.reverse().map((item: any) => ({ tab: item.name, key: item.type }))
      }
      tabActiveKey={tabActiveKey}
    >
      <ProTable<TableListItem, TableListPagination>
        className={classNames('table-part', styles['table-part'])}
        sticky
        actionRef={actionRef}
        ghost={true}
        rowKey="id"
        search={{
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => {
            return dom;
          },
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
                  setSelectedRows([]);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
              });
            }}
          >
            批量删除
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={(): any => {
              Modal.confirm({
                title: '导出数据',
                content: '确定导出全部数据吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                  await exportList();
                },
              });
            }}
          >
            全部导出
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={async () => {
              Modal.confirm({
                title: '导出数据',
                content: '确定导出选中数据吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                  const res: any = await exportList(selectedRowsState);
                  debugger;
                  const blob = new Blob([res.data], {
                    type: 'application/vnd.ms-excel;charset=utf-8',
                  });
                  const downloadElement = document.createElement('a');
                  const href = window.URL.createObjectURL(blob); //创建下载的链接
                  downloadElement.href = href;
                  downloadElement.download =
                    decodeURI(res.headers['content-disposition'].split('filename=')[1]) || ''; //下载后文件名
                  document.body.appendChild(downloadElement);
                  downloadElement.click(); //点击下载
                  document.body.removeChild(downloadElement); //下载完成移除元素
                  window.URL.revokeObjectURL(href); //释放掉blob对象
                  setSelectedRows([]);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
              });
            }}
          >
            批量导出
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
        request={requestList}
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
            placeholder="请输入JSON数据"
            colProps={{ span: 24 }}
            allowClear
          />
        </ModalForm>
      )}
      {createModalVisible && templateData && (
        <CreatePart
          template={templateData}
          onVisibleChange={handleModalVisible}
          onFinish={() => {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        />
      )}
      {updateModalVisible && templateData && (
        <UpdatePart
          template={templateData}
          data={currentRow}
          onVisibleChange={handleUpdateModalVisible}
          onFinish={() => {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        />
      )}
      {showDetail && templateData && (
        <SliderPart
          template={templateData}
          data={currentRow}
          onClose={() => {
            setCurrentRow(undefined);
            setShowDetail(false);
          }}
        />
      )}
    </PageContainer>
  );
};

export default TableList;
