import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { GAME_STATUS } from '.';

interface ResultProps {
  setGameStatus: any;
}

const Result = ({ setGameStatus }: ResultProps) => {
  const router = useRouter();

  const toHomePage = () => {
    router.push('/');
  };

  return (
    <>
      <div className="text-center mt-20">
        <div className="flex-1 min-w-0">
          <header className="bg-white">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold text-gray-900">you won</h1>
            </div>
          </header>
        </div>

        <a
          href="#"
          className="mt-20 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={toHomePage}
        >
          Trang chủ
        </a>
      </div>
    </>
  );
};

export default Result;
