import React, { useState } from 'react';
import Image from 'next/image';
import gameStyles from '@styles/Game.module.css';
import { PLAYER_OPTIONS, ROUND_STATUS_LIST } from '@hooks/consts';

interface OptionProps {
  roundStatus: number;
  secretKey: string;
  setSecretKey: any;
  selectedOption: number;
  setSelectedOption: any;
}

const Option = ({
  roundStatus,
  secretKey,
  setSecretKey,
  selectedOption,
  setSelectedOption,
}: OptionProps) => {
  const handleSecretKeyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecretKey(event.target.value);
  };

  const handleSelectOption = (id: number) => {
    setSelectedOption(id);
  };

  return (
    <>
      {/* SECRET KEY */}
      <div className="mx-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="secretKey"
                  className="block text-sm font-medium text-gray-700"
                >
                  Secret Key
                </label>
                <input
                  type="text"
                  name="secretKey"
                  id="secretKey"
                  onChange={handleSecretKeyChange}
                  value={secretKey}
                  disabled={roundStatus > ROUND_STATUS_LIST.SEND_KEY}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* PLAYER OPTIONS */}
      {roundStatus < ROUND_STATUS_LIST.WAITING_CHOOSE_OPTION && (
        <div className="bg-white">
          <div className="max-w-xl mx-auto py-6 px-4 sm:py-4 sm:px-6 lg:max-w-2xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
              {PLAYER_OPTIONS.map((option) => (
                <div
                  key={option.id}
                  className={`group relative ${
                    selectedOption === option.id && gameStyles.selectedOption
                  }`}
                  onClick={() => handleSelectOption(option.id)}
                >
                  <div className="w-full bg-white aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <Image
                      src={option.imageSrc}
                      alt={option.id + ''}
                      width={200}
                      height={200}
                      layout="responsive"
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Option;
