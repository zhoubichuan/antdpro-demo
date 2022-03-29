import { request } from 'umi';
import type { CurrentUser, NoticeType, ActivitiesType, AnalysisData } from './data';

export async function queryProjectNotice(): Promise<{ data: NoticeType[] }> {
  return request(window.antdprourl + '/api/project/notice');
}

export async function queryActivities(): Promise<{ data: ActivitiesType[] }> {
  return request(window.antdprourl + '/api/activities');
}

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return request(window.antdprourl + '/api/fake_workplace_chart_data');
}

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request(window.antdprourl + '/api/currentUser');
}
