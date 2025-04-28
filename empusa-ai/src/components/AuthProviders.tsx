'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

// This component ensures SessionProvider runs only on the client
export default function AuthProviders({ children }: React.PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
} 