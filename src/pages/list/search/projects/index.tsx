import { Card, Col, Form, List, Row, Select, Typography } from 'antd';
import moment from 'moment';
import type { FC } from 'react';
import { useRequest, Link } from 'umi';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import type { ListItemDataType } from './data.d';
import styles from './style.less';
import React, { useState, useRef, useEffect } from 'react';
import { list, addList, updateList, removeList, exportList, getTemplate } from '../service';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

const Projects: FC = () => {
  const path: string = location.pathname.replace('/antdpro-demo', '');
  const [templateData, setTemplateData] = useState<any>([]);
  const [type, setType] = useState<any>({});
  const [lists, setLists] = useState<any>([]);
  const getData = async (params: any) => {
    let data: any = [];
    const result = await list(
      'data/1',
      {
        current: 1,
      },
      params,
    );
    data = result.data;
    setLists(data);
  };
  const getTemplateData = async () => {
    const { data } = await list(
      'field/1',
      {
        current: 1,
        pageSize: 20,
      },
      { type: path.split('/')[path.split('/').length - 1] },
    );
    setTemplateData(data);
    setLists(data);
    setType({ type: [data[0].value] });
  };
  useEffect(() => {
    getTemplateData();
  }, [path]);
  useEffect(() => {
    if (type.type) {
      type.type = type.type[0];
    }
    getData(type);
  }, [JSON.stringify(type)]);

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
          onValuesChange={(params) => {
            setType(params);
          }}
        >
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <FormItem name="type">
              <TagSelect expandable>
                {templateData.map((item: any) => (
                  <TagSelect.Option value={item.value}>{item.name}</TagSelect.Option>
                ))}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="作者" name="author">
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    {lists.map((item: any) => (
                      <Option value={item.author}>{item.author}</Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="好评度" name="code">
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    {lists.map((item: any) => (
                      <Option value={item.code}>{item.code}</Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>
        {lists && (
          <List<ListItemDataType>
            rowKey="id"
            grid={{
              gutter: 16,
              xs: 2,
              sm: 4,
              md: 6,
              lg: 6,
              xl: 8,
              xxl: 8,
            }}
            dataSource={lists}
            renderItem={(item: any) => (
              <List.Item>
                <Link to={`/list/list?page=data&tab=1&dataId=${item.id}`} target="_blank">
                  <Card
                    className={styles.card}
                    hoverable
                    cover={
                      <img
                        style={{ height: '250px', objectFit: 'contain' }}
                        alt={item.name}
                        src={item.images[0]}
                      />
                    }
                  >
                    <Card.Meta
                      title={<a>{item.name}</a>}
                      description={
                        <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                          {item.descript}
                        </Paragraph>
                      }
                    />
                    <div className={styles.cardItemContent}>
                      <span>{moment(item.updatedAt).fromNow()}</span>
                    </div>
                  </Card>
                </Link>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Projects;
