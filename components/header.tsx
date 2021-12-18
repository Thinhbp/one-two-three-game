import { Popover, Transition } from '@headlessui/react';
import {} from '@heroicons/react/outline';
import { useEthers, useEtherBalance } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const { account, activateBrowserWallet, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);

  const home = () => {
    router.push('/');
  };

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <a
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
              onClick={home}
            >
              One-Two-Three
            </a>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {account ? (
              <>
                <a
                  href="#"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  {etherBalance &&
                    parseFloat(formatEther(etherBalance)).toFixed(4)}{' '}
                  ETH
                </a>
                <a
                  href="#"
                  className="ml-8 mr-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {account.slice(0, 6)}...
                  {account.slice(account.length - 4, account.length)}
                </a>
                <a
                  href="#"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  onClick={deactivate}
                >
                  Disconnect
                </a>
              </>
            ) : (
              <a
                href="#"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => activateBrowserWallet()}
              >
                Connect to Wallet
              </a>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default Header;
