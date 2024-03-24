import { request } from 'umi';
import type { TableListItem } from './data';
const getParams = () =>
  location.search
    .slice(1)
    .split('&')
    .reduce((p: any, n: any) => {
      const [name, value] = n.split('=');
      p[name] = value;
      return p;
    }, {});
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
export async function requestPageList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<{
    data: TableListItem[];
    total?: number;
    success?: boolean;
  }>('/api/list/page/1', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function requestList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<{
    data: TableListItem[];
    total?: number;
    success?: boolean;
  }>('/api/list/' + getParams().page + '/' + getParams().tab, {
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
  }>('/api/list/tab/' + getParams().menu, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function updateList(options?: Record<string, any>) {
  return request<TableListItem>('/api/list/' + getParams().page + '/' + getParams().tab, {
    method: 'PUT',
    data: { ...(options || {}) },
  });
}

export async function addList(options?: Record<string, any>) {
  return request<TableListItem>('/api/list/' + getParams().page + '/' + getParams().tab, {
    method: 'POST',
    data: { ...(options || {}) },
  });
}

export async function removeList(options?: Record<string, any>) {
  return request<Record<string, any>>('/api/list' + getParams().page + '/' + getParams().tab, {
    method: 'DELETE',
    data: { ...(options || {}) },
  });
}
export async function importList(options?: Record<string, any>) {
  return request<TableListItem>(
    '/api/list/' + getParams().page + '/' + getParams().tab + '/import',
    {
      method: 'POST',
      data: options,
    },
  );
}
export async function exportList(options?: Record<string, any>) {
  return request<TableListItem>(
    '/api/list/' + getParams().page + '/' + getParams().tab + '/export',
    {
      method: 'POST',
      responseType: 'blob',
      data: options,
    },
  );
}
