import { FC } from 'react';

import { CheckResult } from '@/interfaces/results';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/formatCurrency';

type Props = {
  checkResult: CheckResult[];
};

const ServiceInfo: FC<Props> = ({ checkResult }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {checkResult.map((item) =>
        item.costs.map((itx, _) => (
          <Card key={_} className="w-full">
            <CardHeader>
              <CardTitle className="text-xl">
                {itx.description} ({itx.service})
              </CardTitle>
              <CardContent>
                {itx.cost.map((itm, _) => (
                  <div key={_}>
                    <div className="flex items-center justify-between gap-2 mt-2">
                      <div className="w-full">
                        Estimasi
                        <Input type="text" value={itm.etd} readOnly disabled />
                      </div>
                      <div className="w-full">
                        Harga
                        <Input
                          type="text"
                          value={formatCurrency(itm.value)}
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      Catatan
                      <Input
                        type="text"
                        value={itm?.note ? itm.note : 'Tidak ada catatan.'}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </CardHeader>
          </Card>
        )),
      )}
    </div>
  );
};

export default ServiceInfo;
