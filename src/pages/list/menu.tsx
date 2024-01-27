import React, { useState, useEffect } from 'react';
import { list as listRequest } from './search/service';

const NoFoundPage: React.FC = () => {
  const [result, setResult] = useState<any>([]);
  const request = async () => {
    const res: any = await listRequest('page/1', {}, {});
    setResult(res.data);
  };
  useEffect(() => {
    request();
  }, []);

  return (
    <div>
      {result.map((i: any, index: any) => (
        <a style={{ marginLeft: '20px' }} href={i.type}>
          {i.name}
        </a>
      ))}
    </div>
  );
};

export default NoFoundPage;
