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

const maskCPF = cpf => {
  cpf = cpf || '';
  cpf = cpf.replace(/\D/g, ''); // remove tudo o que não é dígito
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // coloca um ponto entre o terceiro e o quarto dígitos
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // coloca um ponto entre o terceiro e o quarto dígitos
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // coloca um hífen entre o terceiro e o quarto dígitos

  return cpf;
};

const steps = [
  {
    id: 'initial',
    message: 'Type your password:',
    trigger: 'inputPassword'
  },
  {
    id: 'inputPassword',
    user: true,
    inputAttributes: {
      type: 'password',
      maxLength: 20
    },
    validator: senha => {
      if ((senha || '').length < 8) {
        return 'Senha muito curta';
      }

      return true;
    },
    sensitiveData: true,
    trigger: 'final'
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
