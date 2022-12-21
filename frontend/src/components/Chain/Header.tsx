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
import { Types } from '../../common';
import { formatNumber } from '../../utils';
import { ChainDisplay } from './';
import { Tile } from '../';

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
  l2FinalizedBlockNumber: Types.BlockNumber;
  l2FinalizedBlockHash: Types.BlockHash;
  submittedDigestHash: Types.DigestHash;
  submittedBlockHash: Types.BlockHash;
  challengedBlockHash: Types.BlockHash;
  challengedDigestHash: Types.DigestHash;
  submittedPeriod: Types.AppPeriod;
  challengedPeriod: Types.AppPeriod;
  currentTab: ChainDisplay;
}

export class Header extends React.Component<HeaderProps> {
  public shouldComponentUpdate(nextProps: HeaderProps) {
    return (
      this.props.l2FinalizedBlockNumber !== nextProps.l2FinalizedBlockNumber ||
      this.props.l2FinalizedBlockHash !== nextProps.l2FinalizedBlockHash ||
      this.props.submittedDigestHash !== nextProps.submittedDigestHash ||
      this.props.submittedBlockHash !== nextProps.submittedBlockHash ||
      this.props.submittedPeriod !== nextProps.submittedPeriod ||
      this.props.challengedDigestHash !== nextProps.challengedDigestHash ||
      this.props.challengedBlockHash !== nextProps.challengedBlockHash ||
      this.props.challengedPeriod !== nextProps.challengedPeriod ||
      this.props.currentTab !== nextProps.currentTab
    );
  }

  public render() {
    const {
      l2FinalizedBlockNumber,
      l2FinalizedBlockHash,
      submittedBlockHash,
      submittedDigestHash,
      challengedDigestHash,
      challengedBlockHash,
      submittedPeriod,
      challengedPeriod,
    } = this.props;

    return (
      <div className="Header">
        <Tile
          icon={l2FinalIcon}
          title="L2 finalize block & hash"
          suffix={
            <p
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                fontSize: '14px',
              }}
            >
              {l2FinalizedBlockHash}
            </p>
          }
        >
          #{formatNumber(l2FinalizedBlockNumber)}
        </Tile>
        <div className="divider" />
        <Tile
          icon={submittedDigestIcon}
          title="L1 submitted digest"
          suffix={
            <Labeled>
              <span className="title">Block hash</span>
              {submittedBlockHash}
            </Labeled>
          }
        >
          {submittedDigestHash || '0x'}
        </Tile>
        <Tile
          icon={chanllengedDigestIcon}
          title="L1 challenged digest"
          suffix={
            <Labeled>
              <span className="title">Block hash</span>
              {challengedBlockHash}
            </Labeled>
          }
        >
          {challengedDigestHash || '0x'}
        </Tile>
        <Tile icon={submissionAppPeriodIcon} title="L1 submission AppPeriod">
          {formatNumber(submittedPeriod)}
        </Tile>
        <Tile
          icon={finishedChallengeAppPeriodIcon}
          title="L1 last finished challenge AppPeriod"
        >
          {formatNumber(challengedPeriod)}
        </Tile>
      </div>
    );
  }
}
