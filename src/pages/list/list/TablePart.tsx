import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Upload, Modal, Image } from 'antd';
import React, { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import { requestList, removeList, importList, exportList, addList } from './service';
import styles from './index.less';
import type { TableListItem, TableListPagination } from './data';
import moment from 'moment';
import classNames from 'classnames';

export type TablePartProps = {
  onViewDetail: (e?: any) => void;
  onEdit: (e?: any) => void;
  onCreate: (e?: any) => void;
  onManyCreate: (e?: any) => void;
  template: any[];
  options: string[];
};
const TablePart: React.FC<TablePartProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const { template = [], onViewDetail, onEdit, onCreate, onManyCreate, options = [] } = props;
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
              onViewDetail(entity);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    ...template.map((item: any) => {
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
            template
              .filter((item: any) => item.create)
              .forEach((field: any) => {
                if (record[field.dataIndex]) {
                  copyParams[field.dataIndex] = record[field.dataIndex];
                }
              });
            const success = await handleAdd(copyParams as TableListItem);
            if (success) {
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
            onEdit(obj);
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
    <ProTable<TableListItem, TableListPagination>
      className={classNames('table-part', styles['table-part'])}
      sticky
      actionRef={actionRef}
      ghost={true}
      rowKey="id"
      scroll={{ x: 800, y: 260 }}
      search={{
        labelWidth: 80,
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
        <Button type="primary" key="primary" onClick={onCreate}>
          <PlusOutlined /> 新建
        </Button>,
        <Button type="primary" key="primary" onClick={onManyCreate}>
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
  );
};

export default TablePart;
