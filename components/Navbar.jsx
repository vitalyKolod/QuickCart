'use client'
import React from 'react'
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from '@/assets/assets'
import Link from 'next/link'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useClerk, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  const { isSeller, router, user } = useAppContext()
  const { openSignIn } = useClerk()

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Главная
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Магазин
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          О нас
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Контакты
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push('/seller')}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Панель продавца
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Корзина"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push('/cart')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Мои заказы"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push('/my-orders')}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Аккаунт
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push('/seller')}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Панель продавца
          </button>
        )}
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Главная"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push('/')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Товары"
                  labelIcon={<BoxIcon />}
                  onClick={() => router.push('/all-product')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Корзина"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push('/cart')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Мои заказы"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push('/my-orders')}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Аккаунт
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
