import getConfig from 'next/config';
import { put, call } from 'redux-saga/effects';

import { StatisticsApi } from '&front/app/api/parts/StatisticsApi';
import { actions as authAction } from '&front/app/auth/auth.actions';

import { ProfileApi } from './parts/ProfileApi';
import { retrieveToken } from '../auth/auth.utils';

const { publicRuntimeConfig } = getConfig();
const { statsUrl, backUrl } = publicRuntimeConfig;

export function* createStatisticsApi() {
  const token: ReturnType<typeof retrieveToken> = yield call(retrieveToken);

  if (!token) {
    yield put(authAction.unauthorized());
    throw new Error('Try to use private API for anon user');
  }

  const apiClient = new StatisticsApi(statsUrl, token);

  return apiClient;
}

export function* createProfileApi() {
  const token: ReturnType<typeof retrieveToken> = yield call(retrieveToken);

  if (!token) {
    yield put(authAction.unauthorized());
    throw new Error('Try to use private API for anon user');
  }

  const profileUrl = `${backUrl}/det-bell`;

  const apiClient = new ProfileApi(profileUrl, token);

  return apiClient;
}
