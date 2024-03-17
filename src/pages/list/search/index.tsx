import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { history } from 'umi';
import { list } from './service';
import styles from './style.less';
type SearchProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const Search: FC<SearchProps> = (props) => {
  const path: string = location.pathname.replace('/antdpro-demo', '');
  let tabKey: string = '';
  if (path.includes('articles')) {
    tabKey = 'articles';
  }
  if (path.includes('projects')) {
    tabKey = 'projects';
  }
  if (path.includes('applications')) {
    tabKey = 'applications';
  }
  const [templateData, setTemplateData] = useState<any>([]);
  const [activeKey, setActiveKey] = useState<string>('');
  const getTemplateData = async () => {
    const { data } = await list('type/1', { current: 1, pageSize: 20 });
    const { value } = data[0];
    setTemplateData(data);
    if (!activeKey) {
      if (path.includes(tabKey + '/')) {
        setActiveKey(tabKey + '/' + path.split('/')[path.split('/').length - 1]);
      } else {
        history.push(`${path}/${value}`);
        setActiveKey(tabKey + '/' + value);
      }
    }
  };
  useEffect(() => {
    getTemplateData();
  }, []);
  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    history.push(`${url}/${key}`);
    setActiveKey(key);
  };

  const handleFormSubmit = (value: string) => {
    console.log(value);
  };

  return (
    <PageContainer
      className={styles.pageContainer}
      content={
        <div style={{ textAlign: 'center' }}>
          <Input.Search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={handleFormSubmit}
            style={{ maxWidth: 522, width: '100%' }}
          />
        </div>
      }
      tabList={templateData.map((item: any) => ({
        key: tabKey + '/' + item.value,
        tab: item.name,
      }))}
      tabActiveKey={activeKey}
      onTabChange={handleTabChange}
    >
      <div className={styles.content}> {props.children}</div>
    </PageContainer>
  );
};

export default Search;
