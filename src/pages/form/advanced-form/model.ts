import type { Effect } from 'umi';
import { message } from 'antd';
import { fakeSubmitForm } from './service';

export type ModelType = {
  namespace: string;
  state: Object;
  effects: {
    submitAdvancedForm: Effect;
  };
};

const Model: ModelType = {
  namespace: 'formAndadvancedForm',

  state: {},

  effects: {
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },
};

export default Model;
