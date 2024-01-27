import { request } from 'umi';

import type { TableListItem } from './data';
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
  options?: Record<string, any>,
) {
  return request<{
    data: TableListItem[];
    total?: number;
    success?: boolean;
  }>(
    '/api/list' +
      location.search.slice(1).split('&')[0].replace('page=', '/') +
      location.search.slice(1).split('&')[1].replace('tab=', '/'),
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
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
export async function updateList(options?: Record<string, any>) {
  return request<TableListItem>(
    '/api/list' +
      location.search.slice(1).split('&')[0].replace('page=', '/') +
      location.search.slice(1).split('&')[1].replace('tab=', '/'),
    {
      method: 'PUT',
      data: { ...(options || {}) },
    },
  );
}

export async function addList(options?: Record<string, any>) {
  return request<TableListItem>(
    '/api/list' +
      location.search.slice(1).split('&')[0].replace('page=', '/') +
      location.search.slice(1).split('&')[1].replace('tab=', '/'),
    {
      method: 'POST',
      data: { ...(options || {}) },
    },
  );
}

export async function removeList(options?: Record<string, any>) {
  return request<Record<string, any>>(
    '/api/list' +
      location.search.slice(1).split('&')[0].replace('page=', '/') +
      location.search.slice(1).split('&')[1].replace('tab=', '/'),
    {
      method: 'DELETE',
      data: { ...(options || {}) },
    },
  );
}
export async function importList(options?: Record<string, any>) {
  return request<TableListItem>(
    '/api/list' +
      location.search.slice(1).split('&')[0].replace('page=', '/') +
      location.search.slice(1).split('&')[1].replace('tab=', '/') +
      '/import',
    {
      method: 'POST',
      data: options,
    },
  );
}
export async function exportList(options?: Record<string, any>) {
  return request<TableListItem>(
    '/api/list' +
      location.search.slice(1).split('&')[0].replace('page=', '/') +
      location.search.slice(1).split('&')[1].replace('tab=', '/') +
      '/export',
    {
      method: 'POST',
      responseType: 'blob',
      data: options,
    },
  );
}
