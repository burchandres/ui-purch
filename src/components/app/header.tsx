import { Link, useLocation } from '@tanstack/react-router';
import { SidebarOpen, SquareUser } from 'lucide-react';
import type { FC } from 'react';
import { appearanceConfig } from '@/config/appearance';
import { pagesConfig } from '@/config/pages';
import { Button } from '../base/button';
import { Popover, PopoverContent, PopoverTrigger } from '../base/popover';
import { Sheet, SheetTrigger } from '../base/sheet';
import { PurchLogoSquare } from '../icons/purch-logo';
import { LogOutButtonDialog } from './log-out-button';
import { NavBar } from './navbar';

export const Header: FC = () => {
  const fullPath = useLocation().pathname;
  const atLandingPage = fullPath === '/landing';
  const currentPage = useLocation().pathname.split('/').at(-1);
  const config = (currentPage && pagesConfig.pages[currentPage]) ?? undefined;

  const buttonSize = 18 as const;

  return (
    <Sheet>
      <header className='sticky top-0 z-20 flex-shrink-0'>
        {/* Add flex-shrink-0 */}
        <div className='flex min-h-14 w-full items-center justify-between border bg-background p-2 pr-5 pl-3'>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: appearanceConfig.lgGap,
            }}
          >
            <div className='min-w-13'>
              {!atLandingPage && (
                <SheetTrigger className=''>
                  <SidebarOpen size={16} />
                </SheetTrigger>
              )}
            </div>
            <div className='mt-1 -ml-3'>
              <Link to='/dashboard'>
                <PurchLogoSquare size={29} color='black' />
              </Link>
            </div>
            <span className='logo-text -ml-1 text-xl font-bold'>
              {config ? config.display : ''}
            </span>
          </div>
          <div className='min-w-6'>
            {!atLandingPage && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='ghost'>
                    <SquareUser size={buttonSize} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side='bottom' asChild>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: appearanceConfig.mdGap,
                      width: 'fit-content',
                    }}
                  >
                    <Button size='sm' className='max-w-26' variant='ghost'>
                      <Link to='/settings'>
                        <p className='text-xs'>Settings</p>
                      </Link>
                    </Button>
                    <LogOutButtonDialog />
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <NavBar />
      </header>
    </Sheet>
  );
};
