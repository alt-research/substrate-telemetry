import React from 'react';
import { Maybe, Types } from 'src/common';
import { Connection } from 'src/Connection';
import { ChainData } from 'src/state';
import styled from 'styled-components';
import { Chains } from '../Chains';
import LinkableSvg from '../LinkSvg';
import { ReactComponent as GithubSvg } from './github.svg';
import Logo from './Logo';
import TabOptions from './TabOptions';

const Header: React.FC<{
  className?: string;
  chains: ChainData[];
  subscribed: Maybe<Types.GenesisHash>;
  subscribedData: ChainData | null | undefined;
  connection: Promise<Connection>;
}> = ({ className, chains, subscribed, subscribedData, connection }) => {
  return (
    <div className={className}>
      <div className="logo-container">
        <Logo />
        <LinkableSvg link="https://github.com/alt-research/">
          <GithubSvg />
        </LinkableSvg>
      </div>
      <div className="chains-container">
        <Chains
          chains={chains}
          subscribedHash={subscribed}
          subscribedData={subscribedData}
          connection={connection}
        />
        <TabOptions />
      </div>
    </div>
  );
};

export default styled(Header)`
  height: 112px;
  padding: 0px 24px;
  background: linear-gradient(0deg,#000000 0%, #2f2e56 100%);

  > .logo-container {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  > .chains-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
