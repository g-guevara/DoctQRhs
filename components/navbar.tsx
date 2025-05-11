"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import { Divider } from "@nextui-org/divider";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";

import NextLink from "next/link";
import clsx from "clsx";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo, SearchIcon } from "@/components/icons";

export const Navbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* Logo section - left side */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Link de invitación</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Navigation links and theme switcher - right side */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {/* Custom navigation links now on the right */}
        <ul className="flex gap-8 justify-end items-center">
          <NavbarItem>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href="/"
            >
              Home
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href="/how_to"
            >
              How it works
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href="/Sign_in"
            >
              Sign in
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href="/Sign_up"
            >
              Sign up
            </NextLink>
          </NavbarItem>
          
          {/* Language switcher */}
          <NavbarItem className="ml-4">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="light" 
                  className="min-w-0 px-3"
                >
                  {selectedLanguage}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Language options"
                onAction={(key) => setSelectedLanguage(key.toString())}
              >
                <DropdownItem key="EN">English</DropdownItem>
                <DropdownItem key="ES">Español</DropdownItem>
                <DropdownItem key="FR">Français</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          
          {/* Dark mode theme switcher */}
          <NavbarItem className="ml-3">
            <ThemeSwitch />
          </NavbarItem>
        </ul>
      </NavbarContent>

      {/* Mobile menu section */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* Language dropdown for mobile */}
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="light" 
              className="min-w-0 px-2"
            >
              {selectedLanguage}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Language options"
            onAction={(key) => setSelectedLanguage(key.toString())}
          >
            <DropdownItem key="EN">English</DropdownItem>
            <DropdownItem key="ES">Español</DropdownItem>
            <DropdownItem key="FR">Français</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="p-4">
          <div className="flex flex-col gap-2">
            <NavbarMenuItem>
              <NextLink
                href="/"
                className="text-lg font-medium text-default-700 hover:text-primary"
              >
                Home
              </NextLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NextLink
                href="/how_to"
                className="text-lg font-medium text-default-700 hover:text-primary"
              >
                How it works
              </NextLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NextLink
                href="/Sign_in"
                className="text-lg font-medium text-default-700 hover:text-primary"
              >
                Sign in
              </NextLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NextLink
                href="/Sign_up"
                className="text-lg font-medium text-default-700 hover:text-primary"
              >
                Sign up
              </NextLink>
            </NavbarMenuItem>
          </div>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};