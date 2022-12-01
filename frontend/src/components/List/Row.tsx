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
import { Node } from '../../state';
import { PersistentSet } from '../../persist';
import {
  Column,
  NameColumn,
  LocationColumn,
  ImplementationColumn,
  PeersColumn,
  UploadColumn,
  DownloadColumn,
  L1FinishedChallengeAppPeriod,
  NodeUpTimeColumn,
  BlockHashColumn,
  FinalizedBlockColumn,
  FinalizedHashColumn,
  BlockTimeColumn,
  BlockPropagationColumn,
  LastBlockColumn,
  UptimeColumn,
  VerifiedBlockNumberColumn,
  VerifiedBlockHashColumn,
  WaitSubmittedBlocksColumn,
  L1FinalizedBlockNumberColumn,
  L1FinalizedBlockHashColumn,
  L2FinalizedBlockColumn,
  L2FinalizedHashColumn,
} from './';

import './Row.css';
import { L1ChallengedColumn } from './Column/L1ChallengedColumn';
import { L1SubmittedColumn } from './Column/L1SubmittedColumn';
import { L1SubmissionAppPeriodColumn } from './Column/L1SubmissionAppPeriodColumn';

interface RowProps {
  node: Node;
  pins: PersistentSet<Types.NodeName>;
  columns: Column[];
}

interface RowState {
  update: number;
}

export class Row extends React.Component<RowProps, RowState> {
  public static readonly columns: Column[] = [
    NameColumn,
    LocationColumn,
    ImplementationColumn,
    PeersColumn,
    UploadColumn,
    DownloadColumn,
    VerifiedBlockNumberColumn,
    VerifiedBlockHashColumn,
    WaitSubmittedBlocksColumn,
    L2FinalizedBlockColumn,
    L2FinalizedHashColumn,
    L1FinalizedBlockNumberColumn,
    L1FinalizedBlockHashColumn,
    L1SubmittedColumn,
    L1ChallengedColumn,
    L1SubmissionAppPeriodColumn,
    L1FinishedChallengeAppPeriod,
    NodeUpTimeColumn,
  ];

  private renderedChangeRef = 0;

  public shouldComponentUpdate(nextProps: RowProps): boolean {
    return (
      this.props.node.id !== nextProps.node.id ||
      this.renderedChangeRef !== nextProps.node.changeRef
    );
  }

  public render() {
    const { node, columns } = this.props;

    this.renderedChangeRef = node.changeRef;

    let className = 'Row';

    if (node.propagationTime != null) {
      className += ' Row-synced';
    }

    if (node.pinned) {
      className += ' Row-pinned';
    }

    if (node.stale) {
      className += ' Row-stale';
    }

    console.log('columns', columns);

    return (
      <tr className={className} onClick={this.toggle}>
        {columns.map((col, index) =>
          React.createElement(col, { node, key: index })
        )}
      </tr>
    );
  }

  public toggle = () => {
    const { pins, node } = this.props;

    if (node.pinned) {
      pins.delete(node.name);
    } else {
      pins.add(node.name);
    }
  };
}
