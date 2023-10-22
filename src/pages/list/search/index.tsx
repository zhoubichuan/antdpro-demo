import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import type { FC } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { history } from 'umi';
import { list, addList, updateList, removeList, exportList, getTemplate } from './service';

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
  const path: String = location.pathname.replace('/antdpro-demo', '');
  const [templateData, setTemplateData] = useState<any>([]);
  const getTemplateData = async () => {
    let template: any = [];
    const result = await list(
      {
        current: 1,
        pageSize: 20,
      },
      { type: 'studentType' },
    );
    template = result.data;
    setTemplateData(template);
  };
  useEffect(() => {
    getTemplateData();
  }, []);
  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'articles':
        history.push(`${url}/articles`);
        break;
      case 'applications':
        history.push(`${url}/applications`);
        break;
      case 'projects':
        history.push(`${url}/projects`);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  const getTabKey = () => {
    const { match, location } = props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'articles';
  };

  return (
    <PageContainer
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
      tabList={templateData.map((item: any) => ({ key: 'project', tab: item.name }))}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
      {props.children}
    </PageContainer>
  );
};

export default Search;
