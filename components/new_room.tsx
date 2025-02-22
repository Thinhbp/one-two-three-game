import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useEthers, useEtherBalance } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';
import { useContract } from '../hooks/useContract';
import { utils } from 'ethers';
interface ModalProps {
  open: boolean;
  setOpen: any;
}

export default function NewRoomModal({ open, setOpen }: ModalProps) {
  const router = useRouter();

  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const etherBalanceFormated = etherBalance
    ? parseFloat(formatEther(etherBalance))
    : 0;

  const { useGetRooms, sendSelectGuess, selectGuessState } = useContract();

  const cancelButtonRef = useRef(null);

  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  const [submitBtnText, setSubmitBtnText] = useState('Tạo phòng');

  const [amount, setAmount] = useState('0');
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (value <= 0 || value > etherBalanceFormated) {
      setSubmitBtnDisabled(true);
    } else {
      setSubmitBtnDisabled(false);
    }
    setAmount(event.target.value);
  };

  const [hashcode, setHashcode] = useState('');
  const handleHashcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === '') {
      setSubmitBtnDisabled(true);
    } else {
      setSubmitBtnDisabled(false);
    }
    setHashcode(event.target.value);
  };

  const rooms = useGetRooms();
  let availableRoomId = 0;
  if (rooms.length) {
    availableRoomId = rooms.findIndex((r: any) => !r);
  }

  const handleSubmit = () => {
    // send tx
    console.log('submit room', availableRoomId, hashcode, amount);
    sendSelectGuess(availableRoomId, hashcode, {
      value: utils.parseEther(amount),
    });
  };

  useEffect(() => {
    if (selectGuessState.status === 'Success') {
      // router.push({ pathname: '/room', query: { id: availableRoomId } });
      setOpen(false);
    } else if (selectGuessState.status === 'Mining') {
      setSubmitBtnText('Đang tạo phòng...');
      setSubmitBtnDisabled(true);
    }
  }, [selectGuessState]);

  return (
    <Transition.Root show={open} as={Fragment} appear={true}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 sm:p-6 sm:pb-4">
                <div className="flex-1 min-w-0">
                  <header className="bg-white">
                    <div className="max-w-7xl mx-auto">
                      <h1 className="text-xl font-bold text-gray-900">
                        Tạo phòng mới
                      </h1>
                    </div>
                  </header>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <form action="#" method="POST">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="coin"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Loại Coin
                          </label>
                          <select
                            id="coin"
                            name="coin"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>ETH</option>
                          </select>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số tiền cược
                          </label>
                          <input
                            type="number"
                            name="amount"
                            id="amount"
                            onChange={handleAmountChange}
                            value={amount}
                            min={0}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          <div className="block text-sm font-medium text-gray-700">
                            Max: {etherBalanceFormated} ETH
                          </div>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="rounds"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Hash code with guess (bytes32 format)
                          </label>
                          <input
                            type="text"
                            name="hashcode"
                            id="hashcode"
                            onChange={handleHashcodeChange}
                            value={hashcode}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmit}
                  disabled={submitBtnDisabled}
                >
                  {submitBtnText}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Hủy
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
