import { Card, CardHeader, CardBody } from '@heroui/card';
import { Link } from '@heroui/link';
import { Image } from '@heroui/image';
import { IItem } from '@/types/IItem';
import { makeLongLinkShort } from '@/common/utils';
import { Button } from '@heroui/button';

export const MainCard = (params: IItem) => {
  const { _id, name, link, likes, date } = params.item;
  const { setCurMem, setLike } = params;

  const handlePress = () => {
    setCurMem(params.item);
    setLike(true);
  };

  return (
    <Card className="mt-5 ml-5 hover:bg-pink-700" key={_id}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h3 className="uppercase font-bold w-[300]">{name}</h3>
      </CardHeader>
      <CardBody className="overflow-visible py-2 mt-5">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`${link}`}
          width={300}
        />
        <p className="text-default-500">
          <Link isExternal href={link} size="sm">
            {makeLongLinkShort(link)}
          </Link>
        </p>
        <div className="flex justify-between">
          <p className="text-tiny mt-2">{date}</p>
          <div className="flex flex-row">
            <Button
              className="bg-blue-900 hover:bg-blue-600 w-4"
              size={'sm'}
              onPress={() => handlePress()}
            >
              <p className="text-large">{likes}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
