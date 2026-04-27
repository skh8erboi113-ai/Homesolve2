"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { App, URLOpenListenerEvent } from '@capacitor/app';

const AppUrlListener: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      // Example url: com.homesolve.app://studio-4450623487-72853.web.app/properties/123
      // We want to extract the path and navigate
      const slug = event.url.split('.web.app').pop();
      if (slug) {
        router.push(slug);
      }
    });
  }, [router]);

  return null;
};

export default AppUrlListener;
