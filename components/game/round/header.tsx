import React, { useState } from 'react';
import { LogoutIcon } from '@heroicons/react/outline';
import Withdraw from '../withdraw_modal';
import { ROUND_STATUS_LIST } from '.';

interface HeaderProps {
  roundStatus: number;
  roomId: number;
  currentRound: number;
}

const Header = ({ currentRound, roundStatus, roomId }: HeaderProps) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const handleWithdraw = () => {
    setShowWithdrawModal(true);
  };

  return (
    <>
      {/* HEADER */}
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <header className="bg-white">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Room {roomId}
              </h1>
            </div>
          </header>
        </div>
        {roundStatus < ROUND_STATUS_LIST.WAITING_CHOOSE_OPTION && (
          <div className="mt-5 flex lg:mt-0 lg:ml-4" onClick={handleWithdraw}>
            <span className="hidden sm:block">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogoutIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                Rút tiền
              </button>
            </span>
            {showWithdrawModal && (
              <Withdraw
                roomId={roomId}
                open={showWithdrawModal}
                setOpen={setShowWithdrawModal}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
