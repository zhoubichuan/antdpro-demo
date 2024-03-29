import type { Effect } from 'umi';
import { message } from 'antd';
import { fakeSubmitForm } from './service';

export type ModelType = {
  namespace: string;
  state: Object;
  effects: {
    submitRegularForm: Effect;
  };
};
const Model: ModelType = {
  namespace: 'formAndbasicForm',

  state: {},

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },
};

export default Model;
