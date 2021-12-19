import React, { useState } from 'react';
import Image from 'next/image';
import gameStyles from '../../../styles/Game.module.css';
import { ROUND_STATUS_LIST } from '.';

interface OptionProps {
  roundStatus: number;
  setRoundStatus: any;
  secretKey: string;
  setSecretKey: any;
  hashCode: string;
  setHashCode: any;
  selectedOption: number;
  setSelectedOption: any;
  gameData: any;
}

const Option = ({
  roundStatus,
  setRoundStatus,
  secretKey,
  setSecretKey,
  hashCode,
  setHashCode,
  selectedOption,
  setSelectedOption,
  gameData,
}: OptionProps) => {
  const handleSecretKeyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecretKey(event.target.value);
  };

  const playerOptions = [
    {
      id: 0,
      imageSrc: '/img/bao.webp',
    },
    {
      id: 1,
      imageSrc: '/img/keo.webp',
    },
    {
      id: 2,
      imageSrc: '/img/bua.webp',
    },
  ];
  const handleSelectOption = (id: number) => {
    setSelectedOption(id);
  };

  const handleHashCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHashCode(event.target.value);
  };

  return (
    <>
      {/* Hash code */}
      <div className="mt-5 mx-20 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="hashCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hash code with guess (bytes32 format)
                </label>
                <input
                  type="text"
                  name="hashCode"
                  id="hashCode"
                  onChange={handleHashCodeChange}
                  value={hashCode}
                  disabled={roundStatus > ROUND_STATUS_LIST.SEND_KEY}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* SECRET KEY */}
      <div className="mt-5 mx-20 md:mt-0 md:col-span-2">
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
      <div className="hidden bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-4 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
            {playerOptions.map((option) => (
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
    </>
  );
};

export default Option;
