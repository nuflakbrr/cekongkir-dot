export interface City {
  city_id: string | number;
  province_id?: string | number;
  province?: string;
  type: string;
  city_name: string;
  postal_code: string;
}
