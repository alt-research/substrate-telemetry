import React from 'react';
import styled from 'styled-components';

const LinkSvg: React.FC<{
  className?: string;
  children: React.ReactNode;
  link?: string;
}> = ({ className, children, link }) => {
  return (
    <a className={className} href={link} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default styled(LinkSvg)`
  svg:hover {
    path {
      fill: #9b9cf8;
    }
  }
`;
