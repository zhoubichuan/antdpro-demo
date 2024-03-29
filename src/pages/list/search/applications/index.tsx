import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Dropdown, Form, List, Menu, Row, Select, Tooltip } from 'antd';
import numeral from 'numeral';
import type { FC } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { useRequest } from 'umi';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import type { ListItemDataType } from './data.d';
import { queryFakeList } from './service';
import styles from './style.less';
import { list, addList, updateList, removeList, exportList, getTemplate } from '../service';

const { Option } = Select;

export function formatWan(val: number) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result: React.ReactNode = val;
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const CardInfo: React.FC<{
  activeUser: React.ReactNode;
  newUser: React.ReactNode;
}> = ({ activeUser, newUser }) => (
  <div className={styles.cardInfo}>
    <div>
      <p>活跃用户</p>
      <p>{activeUser}</p>
    </div>
    <div>
      <p>新增用户</p>
      <p>{newUser}</p>
    </div>
  </div>
);

export const Applications: FC<Record<string, any>> = () => {
  const path: string = location.pathname.replace('/antdpro-demo', '');
  const [templateData, setTemplateData] = useState<any>([]);
  const [lists, setLists] = useState<any>([]);
  const getTemplateData = async () => {
    let template: any = [];
    const result = await list(
      'field/1',
      {
        current: 1,
        pageSize: 20,
      },
      { type: path.split('/')[path.split('/').length - 1] },
    );
    template = result.data;
    setTemplateData(template);
    setLists(template);
  };
  useEffect(() => {
    getTemplateData();
  }, [path]);
  const getData = async (params: any) => {
    let data: any = [];
    if (params.category) {
      params.type = params.category[0];
      delete params.category;
    }
    const result = await list(
      'data/1',
      {
        current: 1,
        pageSize: 20,
      },
      params,
    );
    data = result.data;
    setLists(data);
  };
  useEffect(() => {
    getData({});
  }, []);
  const { data, loading, run } = useRequest((values: any) => {
    console.log('form data', values);
    return queryFakeList({
      count: 8,
    });
  });

  const lists1 = data?.list || [];

  const itemMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
          3d menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.filterCardList}>
      <Card bordered={false}>
        <Form
          onValuesChange={(_, values) => {
            run(values);
          }}
        >
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <Form.Item name="category">
              <TagSelect expandable>
                {templateData.map((item: any) => (
                  <TagSelect.Option value={item.value}>{item.name}</TagSelect.Option>
                ))}
              </TagSelect>
            </Form.Item>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="author" label="作者">
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="lisa">王昭君</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="rate" label="好评度">
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="good">优秀</Option>
                    <Option value="normal">普通</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <br />
      <List<ListItemDataType>
        rowKey="id"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        loading={loading}
        dataSource={lists}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              actions={[
                <Tooltip key="download" title="下载">
                  <DownloadOutlined />
                </Tooltip>,
                <Tooltip key="edit" title="编辑">
                  <EditOutlined />
                </Tooltip>,
                <Tooltip title="分享" key="share">
                  <ShareAltOutlined />
                </Tooltip>,
                <Dropdown key="ellipsis" overlay={itemMenu}>
                  <EllipsisOutlined />
                </Dropdown>,
              ]}
            >
              <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
              <div className={styles.cardItemContent}>
                <CardInfo
                  activeUser={formatWan(item.activeUser)}
                  newUser={numeral(item.newUser).format('0,0')}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Applications;
