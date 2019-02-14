import { IncomeModel } from '@shared/models/money/IncomeModel'

import { fetchOrFail } from '@front/domain/store/fetchingRedux/fetchOrFail'

import { createIncomeRequest } from '../api/createIncomeRequest'
import { actions as incomeFetchingActions } from '../reducer/createIncomeFetching'
import { fetchFirstTransactionDate } from './fetchFirstTransactionDate'

export const createIncome = (incomeFields: IncomeModel) =>
  fetchOrFail(incomeFetchingActions, async (dispatch, getApi) => {
    await createIncomeRequest(getApi())(incomeFields)

    await dispatch(fetchFirstTransactionDate() as any)

    // TODO: refetch history
  })
