'use client';

import { ReactNode } from 'react';
import { ModalProvider } from '@/context/ModalContext';
import ContactModal from '@/components/ContactModal';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      {children}
      <ContactModal />
    </ModalProvider>
  );
}
