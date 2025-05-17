'use client';
import React, { useState, FC } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '../components/ui/sidebar';
import { IconListDetails, IconBrandTabler } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import Link from 'next/link';
import NextImage from '../components/Shared/NextImage/NextImage';

interface DashboardLayoutProps {
  animate?: boolean;
  children: React.ReactNode;
}

interface DashboardProps {
  children?: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ animate, children }) => {
  const links = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: 'Collections',
      href: '/collections',
      icon: <IconListDetails className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    // {
    //   label: 'Settings',
    //   href: '#',
    //   icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    // },
    // {
    //   label: 'Logout',
    //   href: '#',
    //   icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    // },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        'mx-auto flex w-full min-h-screen flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800'
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={animate}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <AnimatePresence>
              {open && (
                <motion.div
                  key="donation-message"
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4 } }}
                  exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                >
                  <SidebarLink
                    link={{
                      label: 'By: Kim Santino ',
                      href: 'https://kim-vale-portfolio.vercel.app/',
                      icon: (
                        <NextImage
                          src="/avatar.jpeg"
                          alt="Parts image"
                          fill
                          className="z-10 absolute object-fit overflow-hidden"
                          containerClass="relative w-6 h-6 rounded-full overflow-hidden"
                        />
                      ),
                    }}
                  />
                  <div className="text-xs text-neutral-600 dark:text-neutral-300">
                    If you enjoy my work and want to help keep it going, consider donating 💸{' '}
                    <Link
                      href="https://www.paypal.me/kimsantino"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400"
                    >
                      paypal.me/kimsantino
                    </Link>
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-300">
                    DISCLAIMER: This page is fan-run and not affiliated with Hasbro or Takara Tomy.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard>{children}</Dashboard>
    </div>
  );
};

export default DashboardLayout;

export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        BBX Assistant
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard: FC<DashboardProps> = ({ children }) => {
  return (
    <div className="flex flex-1">
      <div className="flex h-auto w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex flex-1 gap-2">
          <div className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800">{children}</div>
        </div>
      </div>
    </div>
  );
};
