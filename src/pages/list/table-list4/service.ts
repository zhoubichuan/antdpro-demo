// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取规则列表 GET /api/rule4 */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/rule4', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule4 */
export async function updateRule(options?: { [key: string]: any }) {
  return request<TableListItem>('/api/rule4', {
    method: 'PUT',
    data: { ...(options || {}) },
  });
}

/** 新建规则 POST /api/rule4 */
export async function addRule(options?: { [key: string]: any }) {
  return request<TableListItem>('/api/rule4', {
    method: 'POST',
    data: { ...(options || {}) },
  });
}

/** 删除规则 DELETE /api/rule4 */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule4', {
    method: 'DELETE',
    data: { ...(options || {}) },
  });
}
