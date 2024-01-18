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
      const { width, view, ellipsis, dataIndex, title } = item;
      if (['date', 'rate', 'money', 'percent'].includes(view?.type)) {
        return {
          title,
          span: view?.single ? 2 : 1,
          key: dataIndex,
          valueType: view?.type || 'text',
          dataIndex,
          ellipsis: true,
        };
      }
      return {
        title,
        span: view?.single ? 2 : 1,
        key: dataIndex,
        valueType: view?.type || 'text',
        dataIndex,
        ellipsis: true,
        render: (n: any, entry: any) => {
          let text = entry[dataIndex];
          if (item.view && item.view.type === 'image') {
            if (Array.isArray(text)) {
              return text.map((i: any) => {
                if (i.includes('.mp4')) {
                  return (
                    <video
                      controls
                      style={{ objectFit: 'contain', maxHeight: '300px', display: 'inline-block' }}
                    >
                      <source src={i} type="video/mp4" />
                    </video>
                  );
                } else {
                  return <Image style={{ objectFit: 'contain', maxHeight: '300px' }} src={i} />;
                }
              });
            } else {
              if (text.includes('.mp4')) {
                return <video style={{ objectFit: 'contain', maxHeight: '300px' }} src={text} />;
              } else {
                return <Image style={{ objectFit: 'contain', maxHeight: '300px' }} src={text} />;
              }
            }
          }
          if (item.view && item.view.type === 'video') {
            if (Array.isArray(text)) {
              return text.map((i: any) => <video height={300} src={i} />);
            } else {
              return <video height={300} src={text} />;
            }
          }
          return (
            <div style={{ whiteSpace: 'pre-line' }}>
              {typeof text === 'string' ? text : JSON.stringify(text)}
            </div>
          );
        },
        // render: (text: any) => {
        //   debugger;
        //   if (item.view && item.view.type === 'image') {
        //     if (Array.isArray(text)) {
        //       return text.map((i: any) => {
        //         if (i.includes('.mp4')) {
        //           return (
        //             <video
        //               controls
        //               style={{ objectFit: 'contain', maxHeight: '300px', display: 'inline-block' }}
        //             >
        //               <source src={i} type="video/mp4" />
        //             </video>
        //           );
        //         } else {
        //           return <Image style={{ objectFit: 'contain', maxHeight: '300px' }} src={i} />;
        //         }
        //       });
        //     } else {
        //       if (text.includes('.mp4')) {
        //         return <video style={{ objectFit: 'contain', maxHeight: '300px' }} src={text} />;
        //       } else {
        //         return <Image style={{ objectFit: 'contain', maxHeight: '300px' }} src={text} />;
        //       }
        //     }
        //   }
        //   if (item.view && item.view.type === 'time') {
        //     return <div style={{ whiteSpace: 'pre-line' }}>{moment(text).fromNow()}</div>;
        //   }
        // },
      };
    });

  return (
    <Drawer
      title={data[0]?.id}
      destroyOnClose
      closable={true}
      closeIcon={<CloseOutlined />}
      width={'80%'}
      open={true}
      onClose={onClose}
    >
      {Array.isArray(data) &&
        data.map((d) => {
          return (
            <ProDescriptions<TableListItem>
              column={d.single ? 1 : 2}
              request={async () => ({
                data: d || {},
              })}
              params={{
                id: d?.id,
              }}
              columns={descriptions as ProDescriptionsItemProps<TableListItem>[]}
            />
          );
        })}
    </Drawer>
  );
};

export default SliderPart;
