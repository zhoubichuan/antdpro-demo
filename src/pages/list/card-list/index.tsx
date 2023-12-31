import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import { queryFakeList } from './service';
import type { CardListItemDataType } from './data.d';
import styles from './style.less';
import classNames from 'classnames';
import type { TableListItem } from './data';
import { useState } from 'react';
import { list as listRequest, getTemplate } from '../search/service';
import SliderPart from '../list/SliderPart';
const { Paragraph } = Typography;

const CardList = () => {
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [templateData, setTemplateData] = useState<any>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const { data, loading } = useRequest(() => {
    return queryFakeList({
      current: 1,
      pageSize: 10,
    });
  });
  const list: any = data || [];
  const nullData: Partial<CardListItemDataType> = {};
  const viewDetail = async (name: any) => {
    let template: any = [];
    const result = await getTemplate('1', 'data');
    template = result.data;
    let data2: any = [];
    const result2 = await listRequest('data/1', {}, { author: name });
    data2 = result2.data;
    setCurrentRow(data2);
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
    setShowDetail(true);
  };
  return (
    <PageContainer className={classNames('pro-container', styles['pro-container'])}>
      <div className={styles.cardList}>
        <List<Partial<CardListItemDataType>>
          rowKey="id"
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={[nullData, ...list]}
          renderItem={(item) => {
            if (item && item.id) {
              return (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <a key="option1">编辑</a>,
                      <a key="option2" onClick={() => viewDetail(item.name)}>
                        查看详情
                      </a>,
                    ]}
                  >
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.images[0]} />}
                      title={<a>{item.name}</a>}
                      description={
                        <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                          {item.descript}
                        </Paragraph>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }
            return (
              <List.Item>
                <Button type="dashed" className={styles.newButton}>
                  <PlusOutlined /> 新增产品
                </Button>
              </List.Item>
            );
          }}
        />
      </div>
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

export default CardList;
