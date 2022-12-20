import * as React from 'react';
import { ColumnProps } from './';
import { Node } from '../../../state';
import { PolkadotIcon, Tooltip, TooltipCopyCallback } from '../../';
import icon from '../../../icons/shield.svg';
import { Maybe } from '../../../common';

export class VerifierAccountColumn extends React.Component<ColumnProps> {
  public static readonly label = 'Verifier';
  public static readonly icon = icon;
  public static readonly setting = 'verifier';
  public static readonly width = 16;
  public static readonly sortBy = ({ verifier_account }: Node) =>
    verifier_account || '';

  private data: Maybe<string>;
  private copy: Maybe<TooltipCopyCallback>;

  public shouldComponentUpdate(nextProps: ColumnProps) {
    // Node name only changes when the node does
    return this.data !== nextProps.node.verifier_account;
  }

  render() {
    const { verifier_account } = this.props.node;

    console.log(verifier_account);
    this.data = verifier_account;

    if (!verifier_account) {
      return <td className="Column">-</td>;
    }

    return (
      <td className="Column" onClick={this.onClick}>
        <Tooltip text={verifier_account} copy={this.onCopy} />
        <PolkadotIcon
          className="Column-verifier"
          account={verifier_account}
          size={16}
        />
      </td>
    );
  }

  private onCopy = (copy: TooltipCopyCallback) => {
    this.copy = copy;
  };

  private onClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (this.copy != null) {
      this.copy();
    }
  };
}
