import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { Drawer } from 'antd';
import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import { Image } from 'antd';
import moment from 'moment';
import type { TableListItem } from './data';
export type SliderPartProps = {
  onClose?: (e?: any) => void;
  data: any;
  template: any;
};
const SliderPart: React.FC<SliderPartProps> = (props) => {
  const { data, template = [], onClose } = props;
  const descriptions: ProColumns<TableListItem>[] = template
    .filter((item: any) => JSON.stringify(item.view) !== '{}')
    .map((item: any) => {
      const { width, view, ellipsis, ...rest } = item;
      return {
        ...rest,
        render: (text: any) => {
          if (item.view && item.view.type === 'image') {
            if (Array.isArray(text)) {
              return text.map((i: any) => <Image height={300} src={i} />);
            } else {
              return <Image height={300} src={text} />;
            }
          }
          if (item.view && item.view.type === 'time') {
            return <div style={{ whiteSpace: 'pre-line' }}>{moment(text).fromNow()}</div>;
          }
          return (
            <div style={{ whiteSpace: 'pre-line' }}>
              {typeof text === 'string' ? text : JSON.stringify(text)}
            </div>
          );
        },
      };
    });

  return (
    <Drawer
      title={data?.id}
      destroyOnClose
      closable={true}
      closeIcon={<CloseOutlined />}
      width={'80%'}
      open={true}
      onClose={onClose}
    >
      {data?.id && (
        <ProDescriptions<TableListItem>
          column={2}
          request={async () => ({
            data: data || {},
          })}
          params={{
            id: data?.id,
          }}
          columns={descriptions as ProDescriptionsItemProps<TableListItem>[]}
        />
      )}
    </Drawer>
  );
};

export default SliderPart;
