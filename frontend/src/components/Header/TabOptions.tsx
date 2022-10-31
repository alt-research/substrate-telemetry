import React, { useState } from 'react';
import styled from 'styled-components';
import { Tab } from '../Chain/Tab';
import listIcon from '../../icons/list-alt-regular.svg';
import worldIcon from '../../icons/location.svg';
import settingsIcon from '../../icons/settings.svg';
import statsIcon from '../../icons/graph.svg';
import { ChainDisplay } from '../Chain';

const TabOptions: React.FC<{ className?: string }> = ({ className }) => {
  const [currentTab, setDisplay] = useState<ChainDisplay>('list');

  return (
    <div className={className}>
      <Tab
        icon={listIcon}
        label="List"
        display="list"
        tab="list"
        current={currentTab}
        setDisplay={setDisplay}
      />
      <Tab
        icon={worldIcon}
        label="Map"
        display="map"
        tab="map"
        current={currentTab}
        setDisplay={setDisplay}
      />
      <Tab
        icon={statsIcon}
        label="Stats"
        display="stats"
        tab="stats"
        current={currentTab}
        setDisplay={setDisplay}
      />
      <Tab
        icon={settingsIcon}
        label="Settings"
        display="settings"
        tab="settings"
        current={currentTab}
        setDisplay={setDisplay}
      />
    </div>
  );
};

export default styled(TabOptions)`
  height: 40px;
  background: #373741;
  border-radius: 20px;
  margin-left: 80px;
`;
