import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Tab, Tabs, TabList} from 'react-tabs';
import {Icon} from '@iconify/react';
import cx from 'classnames';
import {setLayout} from 'renderer/store/features/renderer';
import {PREVIEW_LAYOUTS} from 'common/constants';
import {Device as IDevice} from 'common/deviceList';
import './styles.css';

interface Props {
  individualDevice: IDevice;
  setIndividualDevice: (device: IDevice) => void;
  devices: IDevice[];
}

const IndividualLayoutToolbar = ({individualDevice, setIndividualDevice, devices}: Props) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const onTabClick = (newTabIndex: number) => {
    setActiveTab(newTabIndex);
    setIndividualDevice(devices[newTabIndex]);
  };

  const isActive = (idx: number) => activeTab === idx;
  const handleCloseBtn = () => dispatch(setLayout(PREVIEW_LAYOUTS.COLUMN));

  useEffect(() => {
    const activeTabIndex = devices.findIndex((device) => device.id === individualDevice.id);
    setActiveTab(activeTabIndex);
  }, [individualDevice, devices]);

  return (
    <div className="my-4 mr-4 ml-12 flex justify-between">
      <Tabs
        onSelect={onTabClick}
        selectedIndex={activeTab}
        className="react-tabs flex min-w-0 flex-1"
      >
        <TabList className="custom-scrollbar flex flex-1 justify-center gap-1 overflow-x-auto border-b border-line-soft">
          {devices.map((device, idx) => (
            <Tab
              className={cx(
                'flex shrink-0 cursor-pointer items-center rounded-t-lg border border-b-0 border-line-soft px-4 py-2 text-[12.5px] text-muted transition-colors hover:bg-hover hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                {
                  'border-line bg-card text-fg': isActive(idx),
                }
              )}
              key={device.id}
            >
              {device.name}
            </Tab>
          ))}
        </TabList>
      </Tabs>
      <button
        type="button"
        aria-label="Close focus layout"
        title="Close focus layout"
        onClick={handleCloseBtn}
        className="relative top-1 ml-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-hover hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Icon icon="carbon:close-outline" height={20} />
      </button>
    </div>
  );
};

export default IndividualLayoutToolbar;
