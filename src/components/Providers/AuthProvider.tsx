"use client"
import { SessionProvider } from 'next-auth/react';
import React from 'react'

type Props = {}

const AuthProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AuthProvider
