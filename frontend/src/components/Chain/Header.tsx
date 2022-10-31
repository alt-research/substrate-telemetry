// Source code for the Substrate Telemetry Server.
// Copyright (C) 2021 Parity Technologies (UK) Ltd.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

import * as React from 'react';
import { Types, Maybe } from '../../common';
import { formatNumber, secondsWithPrecision } from '../../utils';
import { ChainDisplay } from './';
import { Tile, Ago } from '../';

import l2FinalIcon from '../../icons/l2-final.svg';
import submittedDigestIcon from '../../icons/l1-submitted-digest.svg';
import chanllengedDigestIcon from '../../icons/l1-challenged-digest.svg';
import submissionAppPeriodIcon from '../../icons/l1-submission-appperiod.svg';
import finishedChallengeAppPeriodIcon from '../../icons/l1-finished-challenge-appperiod.svg';

import './Header.css';
import styled from 'styled-components';

const Labeled = styled('div')`
  border-left: 2px solid #6667ab;
  padding-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;

  span.title {
    font-size: 13px;
    font-weight: bold;
    color: #a4a4b2;
    margin-right: 4px;
  }
`;

interface HeaderProps {
  best: Types.BlockNumber;
  finalized: Types.BlockNumber;
  blockTimestamp: Types.Timestamp;
  blockAverage: Maybe<Types.Milliseconds>;
  currentTab: ChainDisplay;
}

export class Header extends React.Component<HeaderProps> {
  public shouldComponentUpdate(nextProps: HeaderProps) {
    return (
      this.props.best !== nextProps.best ||
      this.props.finalized !== nextProps.finalized ||
      this.props.blockTimestamp !== nextProps.blockTimestamp ||
      this.props.blockAverage !== nextProps.blockAverage ||
      this.props.currentTab !== nextProps.currentTab
    );
  }

  public render() {
    const { best, finalized, blockTimestamp, blockAverage } = this.props;

    return (
      <div className="Header">
        <Tile icon={l2FinalIcon} title="L2 finalize block & hash" suffix={<p style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontSize: '14px'
        }}>0xd418a3d34f3f35bd418a3d34f3f35b</p>}>
          #{formatNumber(best)}
        </Tile>
        <div className="divider" />
        <Tile icon={submittedDigestIcon} title="L1 submitted digest" suffix={<Labeled><span className="title">Block hash</span>0xd418a3d34f3f35bd418a3d34f3f35b</Labeled>}>
          #{formatNumber(finalized)}
        </Tile>
        <Tile icon={chanllengedDigestIcon} title="L1 challenged digest" suffix={<Labeled><span className="title">Block hash</span>0xd418a3d34f3f35bd418a3d34f3f35b</Labeled>}>
          {blockAverage == null
            ? '-'
            : secondsWithPrecision(blockAverage / 1000)}
        </Tile>
        <Tile icon={submissionAppPeriodIcon} title="L1 submission AppPeriod">
          <Ago when={blockTimestamp} />
        </Tile>
        <Tile icon={finishedChallengeAppPeriodIcon} title="L1 last finished challenge AppPeriod">
          <Ago when={blockTimestamp} />
        </Tile>
      </div>
    );
  }
}
