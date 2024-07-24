import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_API_RAJAONGKIR}province?key=${process.env.NEXT_PUBLIC_API_KEY}`,
    );
    const data = await fetchData.json();

    return NextResponse.json(
      { success: 1, message: 'Data Berhasil di Fetch!', data: data },
      { status: 200 },
    );
  } catch (error) {
    console.log('[PROVINCE_GET]', error);
    return NextResponse.json(
      { success: 0, message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
