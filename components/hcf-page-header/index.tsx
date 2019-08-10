import * as React from 'react';
import Icon from '../icon';

export interface HcfPageHeaderProps {
  headerText?: string;
  onClickBack?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default class HcfPageHeader extends React.Component<HcfPageHeaderProps> {
  render() {
    const { headerText, onClickBack } = this.props;
    return (
      <div>
        <header className="fund-header">
          <Icon
            type="arrow-left"
            style={{ color: '#111A44' }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              if (onClickBack) {
                onClickBack(e);
              }
            }}
          />
          <span className="header-text">{headerText}</span>
        </header>
      </div>
    );
  }
}
