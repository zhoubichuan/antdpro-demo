import { message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { requestTabs, requestList, getTemplate, addList } from './service';
import type { TableListItem } from './data';
import { history, useLocation, useParams } from 'umi';
import type { ActionType } from '@ant-design/pro-table';
import classNames from 'classnames';
import styles from './index.less';
import SliderPart from './SliderPart';
import UpdatePart from './UpdatePart';
import CreatePart from './CreatePart';
import TablePart from './TablePart';
const TableList: React.FC = () => {
  const { pathname }: any = useLocation();
  const params: any = useParams();
  const [createManyModalVisible, handleManyModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [tabActiveKey, setTabActiveKey] = useState<any>(
    pathname.split('/')[pathname.split('/').length - 1],
  );
  const [tabs, setTabs] = useState<any>([]);
  const [templateData, setTemplateData] = useState<any>([]);
  const [options, setOptions] = useState<string[]>([]);
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
    if (pathname.includes('template') || pathname.includes('backend') || pathname.includes('tab')) {
      template = await require(`../${pathname.split('/')[2]}/${key}.json`);
    } else {
      const result = await getTemplate(key, pathname.split('/')[2]);
      template = result.data;
    }
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
    setTemplateData(template);
    const tabsData = await requestTabs({});
    setTabs(tabsData.data);
    if (params?.id) {
      const result: any = await requestList({ current: 1, pageSize: 1 }, { id: params.id });
      setOptions(result.data);
    }
    setTabActiveKey(key);
  };
  const handleOnSearch = async () => {
    const { data }: any = await requestList({ current: 1 });
    setOptions(data);
  };
  useEffect(() => {
    getTemplateData(params?.id || 1);
    handleOnSearch();
  }, []);
  useEffect(() => {
    getTemplateData(params.id);
    handleOnSearch();
  }, [params.id]);

  return (
    <PageContainer
      className={classNames('container-part', styles['container-part'])}
      onTabChange={async (key: string) => {
        // await getTemplateData(key);
        // if (actionRef.current) {
        //   actionRef.current.reload();
        // }
        history.push(pathname.slice(0, -1) + key);
      }}
      header={{
        title: false,
        ghost: true,
      }}
      tabList={
        pathname.includes('tab')
          ? []
          : tabs
              .reverse((a: any, b: any) => a.type - b.type)
              .map((item: any) => ({ tab: item.name, key: item.type }))
      }
      tabActiveKey={tabActiveKey}
    >
      <TablePart
        options={options}
        template={templateData}
        onViewDetail={(entity) => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}
        onEdit={(obj) => {
          setCurrentRow(obj);
          handleUpdateModalVisible(true);
        }}
        onCreate={() => {
          handleModalVisible(true);
        }}
        onManyCreate={() => {
          handleManyModalVisible(true);
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
