import React, { useMemo, useEffect } from 'react';
import { useStoreMap, useGate } from 'effector-react';
import { useRouter } from 'react-router5';
import { Option } from 'tsoption';
import { take } from 'lodash';

import { Button } from '&front/presentation/atoms';
import { LoaderTable } from '&front/legacy_ui/components/layout/loader-table';
import { Currency, formatMoney } from '&front/application/currency';
import { PeriodType, DateRange } from '&front/shared';
import { Route } from '&front/application/router';
import {
  selectCategoriesByPeriod,
  $categories,
  CategoriesGate,
} from '&front/application/statistics';

interface Props {
  className?: string;
  currency: Currency;
  group: PeriodType.Month | PeriodType.Year;
  widthPercent: number;
  maxLength: number;
}

export const Categories = ({
  className,
  currency,
  group,
  widthPercent,
  maxLength,
}: Props) => {
  const columns = useMemo(
    () => ({
      category: {
        title: 'Category',
        widthPercent,
      },
      amount: {
        title: 'Amount',
        transform: formatMoney(currency),
      },
    }),
    [currency, widthPercent],
  );

  const dateRange = DateRange.createUtcPeriod(group);
  const { navigate } = useRouter();
  useGate(CategoriesGate, { periodType: group, dateRange });

  const data = useStoreMap({
    store: $categories,
    keys: [group, dateRange],
    fn: selectCategoriesByPeriod,
  });

  const preparedData = useMemo(
    () =>
      Option.of(data)
        .map((v) => v!.expenses)
        .map((v) => take(v, maxLength)),
    [data, maxLength],
  );

  return (
    <LoaderTable
      title="На что вы тратите деньги"
      columns={columns}
      data={preparedData}
      fetching={{ loading: preparedData.isEmpty() }}
      expectedRows={maxLength}
      className={className}
      hideHeader
      footer={
        <Button
          mod="ghost"
          onClick={() =>
            navigate(Route.DetailedStatistics, { type: 'categories', group })
          }
        >
          Подробнее
        </Button>
      }
    />
  );
};
