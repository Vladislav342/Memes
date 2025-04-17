'use client';

import { useState } from 'react';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/navbar';
import { link as linkStyles } from '@heroui/theme';
import NextLink from 'next/link';
import clsx from 'clsx';
import { siteConfig } from '@/config/site';
import { Divider } from '@heroui/divider';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarContent className=" basis-1/5 sm:basis-full" justify="center">
        <ul className="hidden lg:flex md:flex sm:flex gap-4 justify-start ml-5">
          {siteConfig.navItems.map((item, index) => (
            <div className="flex direction-row" key={index}>
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ size: 'lg', color: 'foreground' }),
                    'data-[active=true]:text-primary data-[active=true]:font-medium hover:text-blue-400',
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
              {siteConfig.navItems.length - 1 !== index ? (
                <Divider className="ml-3" orientation="vertical" />
              ) : null}
            </div>
          ))}
        </ul>
      </NavbarContent>

      <NavbarMenu>
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NextLink
              className={clsx(
                linkStyles({ size: 'sm', color: 'foreground' }),
                'data-[active=true]:text-primary data-[active=true]:font-medium hover:text-blue-400',
              )}
              color="foreground"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NextLink>
            {siteConfig.navItems.length - 1 !== index ? (
              <Divider className="mt-3" orientation="horizontal" />
            ) : null}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
};
