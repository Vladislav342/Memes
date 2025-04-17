import { IMemDataDto } from '../types/MemDataDto';

export async function getSortedMemesData(): Promise<IMemDataDto[]> {
  const fetchMemes = async (): Promise<IMemDataDto[]> => {
    const res = await fetch('http://localhost:3000/api/memes', {
      method: 'GET',
    });
    if (!res.ok) {
      throw new Error('Failed to get Memes');
    }
    const memes: IMemDataDto[] = await res.json();
    return memes;
  };

  let allMemes: IMemDataDto[] = await fetchMemes();
  return allMemes.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function removeMem(id: string): Promise<void | string> {
  const fetchRemoveMem = async (): Promise<void | string> => {
    const res = await fetch(`http://localhost:3000/api/memes?_id=${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to remove the Mem');
    }

    const result: void | string = await res.json();
    return result;
  };

  const removedMem = await fetchRemoveMem();
  return removedMem;
}

export async function createMem({
  name,
  date,
  link,
  likes,
}: IMemDataDto): Promise<IMemDataDto | string> {
  const fetchNewMem = async (): Promise<IMemDataDto | string> => {
    const res = await fetch('http://localhost:3000/api/memes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        date,
        link,
        likes,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to create a Mem');
    }

    const mem: IMemDataDto | string = await res.json();
    return mem;
  };

  const newMem = await fetchNewMem();
  return newMem;
}

export async function editMem({
  _id,
  name,
  date,
  link,
  likes,
}: IMemDataDto): Promise<IMemDataDto | string> {
  const fetchEditMem = async (): Promise<IMemDataDto | string> => {
    const res = await fetch('http://localhost:3000/api/memes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
        name,
        date,
        link,
        likes,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to edit the Mem');
    }

    const mem: IMemDataDto | string = await res.json();
    return mem;
  };

  const editedMem = await fetchEditMem();
  return editedMem;
}
