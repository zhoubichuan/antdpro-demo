// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';
export async function rule(
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
  }>('/api/rule' + location.href.slice(-1), {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateRule(options?: { [key: string]: any }) {
  return request<TableListItem>('/api/rule' + location.href.slice(-1), {
    method: 'PUT',
    data: { ...(options || {}) },
  });
}

export async function addRule(options?: { [key: string]: any }) {
  return request<TableListItem>('/api/rule' + location.href.slice(-1), {
    method: 'POST',
    data: { ...(options || {}) },
  });
}

export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule' + location.href.slice(-1), {
    method: 'DELETE',
    data: { ...(options || {}) },
  });
}
