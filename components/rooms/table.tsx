import { PlusIcon } from '@heroicons/react/outline';
import { useCallback, useState } from 'react';
import Web3 from 'web3';
import NewRoomModal from './new';
import { showAddress } from '@hooks/utils';
import { usePageContext, ACTIONS, PAGES } from '@components/common/page';
import { ROOM_STATUS } from '@hooks/consts';

interface TableProps {
  header: string;
  roomsData: any[];
  showCreateNewRoomBtn?: boolean;
  showNewRoomModal?: boolean;
  setNewRoomModal?: any;
}

export default function Table({
  header,
  roomsData,
  showCreateNewRoomBtn,
  showNewRoomModal,
  setNewRoomModal,
}: TableProps) {
  const [state, dispatch] = usePageContext();

  const columns = [
    { name: '#' },
    { name: 'Room' },
    { name: 'Owner' },
    { name: 'Coin' },
    { name: 'Amount' },
    { name: 'Status' },
  ];

  const handleSelectRoom = (room: any) => {
    if (room.status === ROOM_STATUS.EMPTY) {
      alert('This room has been closed!');
      return;
    }
    dispatch({
      type: ACTIONS.SET_PAGE,
      payload: { page: PAGES.ROOM, id: room.id },
    });
  };

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <header className="bg-white">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold text-gray-900">{header}</h1>
            </div>
          </header>
        </div>
        {showCreateNewRoomBtn && (
          <>
            <div
              className="mt-5 flex lg:mt-0 lg:ml-4"
              onClick={() => setNewRoomModal(true)}
            >
              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  Create room
                </button>
              </span>
            </div>
            {showNewRoomModal && (
              <NewRoomModal open={showNewRoomModal} setOpen={setNewRoomModal} />
            )}
          </>
        )}
      </div>
      <div className="flex flex-col mb-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column: any, index: number) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {roomsData.map((room: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                          onClick={() => handleSelectRoom(room)}
                        >
                          Room {room.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {showAddress(room.Address_1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          ETH
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Web3.utils.fromWei(room.Bet_amount, 'ether')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                          {room.status === ROOM_STATUS.EMPTY && 'Empty'}
                          {room.status === ROOM_STATUS.ONE_PLAYER && '1 player'}
                          {room.status === ROOM_STATUS.TWO_PLAYERS &&
                            '2 players'}
                          {room.status === ROOM_STATUS.CLOSED && 'Closed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
