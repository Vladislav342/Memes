import dbConnect from '@/lib/dbConnect';
import MemService from '@/service/MemController';
import { NextResponse, NextRequest } from 'next/server';
import memValidation from '@/validation/memValidSchema';

export async function GET() {
  await dbConnect();

  try {
    const memes = await MemService.findAllMemes();
    return NextResponse.json(memes);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const { _id } = Object.fromEntries(req.nextUrl.searchParams);
    const remMem = await MemService.removeMem(_id);
    return NextResponse.json(remMem);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();

  try {
    const { _id, name, date, link, likes } = await req.json();
    let { error }: any = memValidation({ name, date, link, likes });
    if (error) {
      return NextResponse.json(error.details[0].message);
    }

    const editedBlog = await MemService.findMemAndUpdate(
      _id,
      name,
      date,
      link,
      likes,
    );
    return NextResponse.json(editedBlog);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { name, date, link, likes } = await req.json();
    let { error }: any = memValidation({ name, date, link, likes });
    if (error) {
      return NextResponse.json(error.details[0].message);
    }

    const newMem = await MemService.createMem(name, date, link, likes);
    return NextResponse.json(newMem);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
