import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import { queryFakeList } from './service';
import type { CardListItemDataType } from './data.d';
import styles from './style.less';
import classNames from 'classnames';
const { Paragraph } = Typography;

const CardList = () => {
  const { data, loading } = useRequest(() => {
    return queryFakeList({
      current: 1,
      pageSize: 10,
    });
  });
  const list: any = data || [];
  const nullData: Partial<CardListItemDataType> = {};
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
                    actions={[<a key="option1">编辑</a>, <a key="option2">查看详情</a>]}
                  >
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.images[0]} />}
                      title={<a>{item.author}</a>}
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
    </PageContainer>
  );
};

export default CardList;
