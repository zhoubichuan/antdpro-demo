import { request } from 'umi';

import { TableListItem } from './data';
export async function getTemplate(key: string, type: string) {
  return request<{
    data: TableListItem[];
    total?: number;
    success?: boolean;
  }>('/api/list/template/' + key, {
    method: 'GET',
    params: {
      type: type,
    },
  });
}
export async function requestList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    total?: number;
    success?: boolean;
  }>('/api' + location.pathname.replace('/antdpro-demo', ''), {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function requestTabs(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: {},
) {
  return request<{
    data: TableListItem[];
    total?: number;
    success?: boolean;
  }>('/api/list/tab/1', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function updateList(options?: { [key: string]: any }) {
  return request<TableListItem>('/api' + location.pathname.replace('/antdpro-demo', ''), {
    method: 'PUT',
    data: { ...(options || {}) },
  });
}

export async function addList(options?: { [key: string]: any }) {
  return request<TableListItem>('/api' + location.pathname.replace('/antdpro-demo', ''), {
    method: 'POST',
    data: { ...(options || {}) },
  });
}

export async function removeList(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api' + location.pathname.replace('/antdpro-demo', ''), {
    method: 'DELETE',
    data: { ...(options || {}) },
  });
}
export async function importList(options?: { [key: string]: any }) {
  return request<TableListItem>(
    '/api' + location.pathname.replace('/antdpro-demo', '') + '/import',
    {
      method: 'POST',
      data: options,
    },
  );
}
export async function exportList(options?: { [key: string]: any }) {
  return request<TableListItem>(
    '/api' + location.pathname.replace('/antdpro-demo', '') + '/export',
    {
      method: 'POST',
      responseType: 'blob',
      data: options,
    },
  );
}
