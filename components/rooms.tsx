import { PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import NewRoomModal from './new_room';

interface RoomsProps {
  header: string;
  roomsData: any[];
  showCreateNewRoomBtn?: boolean;
}

export default function Rooms({
  header,
  roomsData,
  showCreateNewRoomBtn,
}: RoomsProps) {
  const router = useRouter();

  const [showNewRoomModal, setNewRoomModal] = useState(false);

  const columns = [
    { name: '#' },
    { name: 'Room' },
    { name: 'Coin' },
    { name: 'Amount' },
    { name: 'Round' },
  ];

  const handleSelectRoom = (room: any) => {
    router.push({ pathname: '/room', query: { id: room.id } });
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
                  Tạo phòng
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
                      <td className="px-6 py-4 whitespace-nowrap">{room.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleSelectRoom(room)}
                        >
                          {room.room}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {room.coin}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {room.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {room.rounds}
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
