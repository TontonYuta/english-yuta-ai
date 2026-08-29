import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      webview: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        partition?: string;
        allowpopups?: string | boolean;
        webpreferences?: string;
        useragent?: string;
        autosize?: string | boolean;
        nodeintegration?: string | boolean;
      };
    }
  }

  interface Window {
    electronAPI?: {
      platform: string;
      version: string;
    };
  }
}

export {};
