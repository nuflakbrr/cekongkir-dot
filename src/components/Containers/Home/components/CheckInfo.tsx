import { FC } from 'react';

import { City } from '@/interfaces/city';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Props = {
  resultCityOrigin: City | undefined;
  resultCityDestination: City | undefined;
};

const CheckInfo: FC<Props> = ({ resultCityDestination, resultCityOrigin }) => {
  return (
    <Card className="w-full mb-5">
      <CardHeader>
        <CardTitle className="text-xl">Informasi Cek Ongkir</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <div>
            <h1 className="text-sm text-muted-foreground">Dari</h1>

            <div className="flex items-center justify-between gap-2 mt-2">
              <div className="w-full">
                Kota/Kab
                <Input
                  type="text"
                  value={
                    resultCityOrigin?.type + ' ' + resultCityOrigin?.city_name
                  }
                  readOnly
                  disabled
                />
              </div>
              <div className="w-full">
                Provinsi
                <Input
                  type="text"
                  value={resultCityOrigin?.province}
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div className="mt-2">
              Kode Pos
              <Input
                type="text"
                value={resultCityOrigin?.postal_code}
                readOnly
                disabled
              />
            </div>
          </div>

          <div>
            <h1 className="text-sm text-muted-foreground">Ke</h1>

            <div className="flex items-center justify-between gap-2 mt-2">
              <div className="w-full">
                Kota/Kab
                <Input
                  type="text"
                  value={
                    resultCityDestination?.type +
                    ' ' +
                    resultCityDestination?.city_name
                  }
                  readOnly
                  disabled
                />
              </div>
              <div className="w-full">
                Provinsi
                <Input
                  type="text"
                  value={resultCityDestination?.province}
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div className="mt-2">
              Kode Pos
              <Input
                type="text"
                value={resultCityDestination?.postal_code}
                readOnly
                disabled
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckInfo;
