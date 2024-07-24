import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const provinceId = searchParams.get('province');

    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_API_RAJAONGKIR}city?key=${process.env.NEXT_PUBLIC_API_KEY}&province=${provinceId}`,
    );
    const data = await fetchData.json();

    return NextResponse.json(
      { success: 1, message: 'Data Berhasil di Fetch!', data: data },
      { status: 200 },
    );
  } catch (error) {
    console.log('[CITY_GET]', error);
    return NextResponse.json(
      { success: 0, message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
