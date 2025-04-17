import Mem from '@/models/Memes';

class MemController {
  async findAllMemes() {
    return await Mem.find({});
  }

  async createMem(name: string, date: string, link: string, likes: number) {
    return await Mem.create({ name, date, link, likes });
  }

  async findMemAndUpdate(
    _id: string,
    name: string,
    date: string,
    link: string,
    likes: number,
  ) {
    return await Mem.findOneAndUpdate(
      { _id },
      { name, date, link, likes },
      {
        returnOriginal: false,
      },
    );
  }

  async removeMem(_id: string) {
    return await Mem.deleteOne({ _id });
  }
}

const MemService = new MemController();

export default MemService;
