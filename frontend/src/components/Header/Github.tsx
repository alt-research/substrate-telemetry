import React from 'react';
import styled from 'styled-components';
import GithubSvg from './github.svg';

const Github: React.FC<{ className?: string }> = ({ className }) => {
  return <img className={className} src={GithubSvg} />;
};

export default styled(Github)``;
