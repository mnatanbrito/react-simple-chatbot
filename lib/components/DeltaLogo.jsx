import React from 'react';
import styled from 'styled-components';

import defaultTheme from '../theme';

const DeltaLogo = styled.div`
  font-family: ${({ theme }) => theme.fontFamily};
  position: relative;
  top: 10px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  transform: ${({ opened }) => (opened ? 'scale(1)' : 'scale(0)')};
  transform-origin: ${({ floatingStyle }) => floatingStyle.transformOrigin || 'bottom right'};
  transition: transform 0.3s ease;

  @media screen and (max-width: 568px) {
    bottom: 0 !important;
    left: initial !important;
    height: 100%;
    right: 0 !important;
    width: 100%;
  }

  .powered-by-wrapper {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

DeltaLogo.defaultProps = {
  theme: defaultTheme
};

export default ({ logoImage, logoAlt, logoClass, floating, floatingStyle, opened, width }) => (
  <DeltaLogo floating={floating} floatingStyle={floatingStyle} opened={opened} width={width}>
    <div className="powered-by-wrapper">
      <img src={logoImage} alt={logoAlt} className={logoClass} />
    </div>
  </DeltaLogo>
);
