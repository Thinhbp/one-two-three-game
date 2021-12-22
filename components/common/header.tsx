import { Popover, Transition } from '@headlessui/react';
import { useEthers, useEtherBalance } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';
import { showAddress } from '@hooks/utils';
import { usePageContext, ACTIONS, PAGES } from './page';

export const Header = (props: any) => {
  const [state, dispatch] = usePageContext();

  const { account, activateBrowserWallet, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  const etherBalanceFormatted =
    etherBalance && parseFloat(formatEther(etherBalance)).toFixed(4);
  // console.log('account ', account, etherBalanceFormatted);

  const home = () => {
    dispatch({ type: ACTIONS.SET_PAGE, payload: { page: PAGES.HOME } });
  };

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <div
              className="text-base font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
              onClick={home}
            >
              One-Two-Three
            </div>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {account ? (
              <>
                <div className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  {etherBalanceFormatted} ETH
                </div>
                <div className="ml-8 mr-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  {showAddress(account)}
                </div>
                <div
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
                  onClick={deactivate}
                >
                  Disconnect
                </div>
              </>
            ) : (
              <div
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                onClick={() => activateBrowserWallet()}
              >
                Connect to Wallet
              </div>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
};
