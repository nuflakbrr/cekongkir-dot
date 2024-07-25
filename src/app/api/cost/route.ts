import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { origin, destination, weight, courier } = body;

    const headers = new Headers({
      'Content-Type': 'application/json',
      key: process.env.NEXT_PUBLIC_API_KEY ?? '',
    });

    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_API_RAJAONGKIR}cost?key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          origin: origin,
          destination: destination,
          weight: weight,
          courier: courier,
        }),
      },
    );
    const data = await fetchData.json();

    return NextResponse.json(
      { success: 1, message: 'Data Berhasil di Fetch!', data: data },
      { status: 200 },
    );
  } catch (error) {
    console.log('[COST_POST]', error);
    return NextResponse.json(
      { success: 0, message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
