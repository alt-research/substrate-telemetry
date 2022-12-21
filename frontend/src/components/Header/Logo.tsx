import React from 'react';
import styled from 'styled-components';
import LogoSvg from './logo.svg';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return <img className={className} src={LogoSvg} />;
};

export default styled(Logo)``;
