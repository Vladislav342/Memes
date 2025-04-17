'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  getSortedMemesData,
  removeMem,
  editMem,
  createMem,
} from '../../lib/http';
import { title } from '@/components/primitives';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { Toast } from '@/components/toast';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@heroui/table';
import { useDisclosure, useDraggable } from '@heroui/modal';
import { Tooltip } from '@heroui/tooltip';
import { memesColumns, labels } from './constants';
import { IColumnDataDto } from '@/types/ColumnDataDto';
import { IMemDataDto } from '@/types/MemDataDto';
import { AlertModal } from '@/components/modal';
import { makeLongLinkShort } from '@/common/utils';
import { createToast } from '@/common/utils';

export default function ColumnarMemesPage() {
  const [memes, setMemes] = useState<IMemDataDto[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [curMem, setCurMem] = useState<IMemDataDto | null>(null);
  const [isRemove, setRemove] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string>('');
  const [changeName, setChangeName] = useState<string>('');
  const [changeLink, setChangeLink] = useState<string>('');
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isCreate, setCreate] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [correctTextarea, setCorrectTextarea] = useState<boolean>(false);
  const [correctLink, setCorrectLink] = useState<boolean>(false);

  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    canOverflow: true,
    isDisabled: !isOpen,
  });

  const memoizedMemes = useMemo(
    () =>
      memes.map(mem => ({
        ...mem,
      })),
    [memes],
  );

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const data = await getSortedMemesData();
        setMemes(data);
      } catch (err: any) {
        createToast({
          title: 'Error',
          desc: err.message,
          typeToast: 'danger',
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          await editMem({
            _id: curMem?._id || '',
            name: changeName,
            date: curMem?.date || '',
            link: changeLink,
            likes: curMem?.likes || 0,
          });
          const data = await getSortedMemesData();
          setMemes(data);
          createToast({
            title: 'Editing',
            desc: 'The Mem was successfully edited',
            typeToast: 'success',
          });
        } catch (err: any) {
          createToast({
            title: 'Error',
            desc: err.message,
            typeToast: 'danger',
          });
        } finally {
          setEdit(false);
          setCurMem(null);
        }
      })();
    }
  }, [isEdit]);

  useEffect(() => {
    if (isRemove && curMem) {
      (async () => {
        try {
          await removeMem(curMem?._id || '');
          const data = await getSortedMemesData();
          setMemes(data);
          createToast({
            title: 'Removing',
            desc: 'The Mem was successfully removed',
            typeToast: 'success',
          });
        } catch (err: any) {
          createToast({
            title: 'Error',
            desc: err.message,
            typeToast: 'danger',
          });
        } finally {
          setRemove(false);
          setCurMem(null);
        }
      })();
    }
  }, [isRemove]);

  useEffect(() => {
    if (isCreate) {
      let day = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      let date = `${year}-${month}-${day}`;

      (async () => {
        try {
          await createMem({
            name: changeName,
            date,
            link: changeLink,
            likes: 0,
          });
          const data = await getSortedMemesData();
          setMemes(data);
          createToast({
            title: 'Creating',
            desc: 'The Mem was successfully created',
            typeToast: 'success',
          });
        } catch (err: any) {
          createToast({
            title: 'Error',
            desc: err.message,
            typeToast: 'danger',
          });
        } finally {
          setCreate(false);
          setChangeName('');
          setChangeLink('');
        }
      })();
    }
  }, [isCreate]);

  const handleRemove = (item: IMemDataDto) => {
    setTypeModal('Remove');
    setCurMem(item);
    onOpen();
  };

  const handleOpenModal = (item: IMemDataDto) => {
    setTypeModal('Edit');
    setCurMem(item);
    setChangeName(item.name || '');
    setChangeLink(item.link || '');
    onOpen();
  };

  const handleCreateModal = () => {
    setTypeModal('Create');
    setChangeName('');
    setChangeLink('');
    onOpen();
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className={title()}>{labels.title}</h1>
        <Button
          className="bg-pink-900 hover:bg-pink-600"
          onPress={handleCreateModal}
        >
          {labels.newMemBtn}
        </Button>
      </div>
      {isLoading ? (
        <Spinner
          className="flex justify-center mt-[300]"
          size="lg"
          color="primary"
          label=""
          labelColor="primary"
        />
      ) : null}
      {!isLoading &&
        (memoizedMemes.length === 0 ? (
          <h2 className="flex justify-center mt-[300]">{labels.emptyMes}</h2>
        ) : (
          <Table
            aria-label="Example table with dynamic content"
            className="mt-10"
          >
            <TableHeader columns={memesColumns}>
              {(column: IColumnDataDto) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={memoizedMemes}>
              {item => (
                <TableRow key={item._id} className="hover:bg-violet-600">
                  {columnKey =>
                    columnKey === 'actions' ? (
                      <TableCell>
                        <div className="relative flex items-center gap-2">
                          <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <Button
                                color="default"
                                onPress={() => handleOpenModal(item)}
                              >
                                {labels.editBtn}
                              </Button>
                            </span>
                          </Tooltip>
                          <Tooltip color="warning" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                              <Button
                                color="danger"
                                onPress={() => handleRemove(item)}
                              >
                                {labels.removeBtn}
                              </Button>
                            </span>
                          </Tooltip>
                        </div>
                      </TableCell>
                    ) : (
                      <TableCell>
                        {columnKey === 'link'
                          ? getKeyValue(
                              { ...item, link: makeLongLinkShort(item.link) },
                              columnKey,
                            )
                          : getKeyValue(item, columnKey)}
                      </TableCell>
                    )
                  }
                </TableRow>
              )}
            </TableBody>
          </Table>
        ))}

      <Toast />
      <AlertModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        moveProps={moveProps}
        typeModal={typeModal}
        setRemove={setRemove}
        setEdit={setEdit}
        changeName={changeName}
        setChangeName={setChangeName}
        changeLink={changeLink}
        setChangeLink={setChangeLink}
        setCreate={setCreate}
        correctLink={correctLink}
        setCorrectLink={setCorrectLink}
        correctTextarea={correctTextarea}
        setCorrectTextarea={setCorrectTextarea}
      />
    </div>
  );
}
