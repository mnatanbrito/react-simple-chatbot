import React from 'react';
import { ThemeProvider } from 'styled-components';

import ChatBot from '../../lib/index';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

const steps = [
  {
    id: 'initial',
    message: 'Type your password',
    trigger: 'promptPassword'
  },
  {
    id: 'promptPassword',
    user: true,
    inputAttributes: {
      type: 'password'
    },
    trigger: 'final',
    sensitiveData: true
  },
  {
    id: 'final',
    message: 'Thank you (=',
    end: true
  }
];

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <React.StrictMode>
      <ChatBot steps={steps} />
    </React.StrictMode>
  </ThemeProvider>
);

export default ThemedExample;
