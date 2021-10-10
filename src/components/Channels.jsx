import React from 'react';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { setCurrentChannelId } from '../slices/channels.js';
import { channelsSelector, channelIdSelector } from '../selectors.js';
import { setModal } from '../slices/modal.js';

const ButtonChannel = ({ classChannelActive, channel }) => {
  const dispatch = useDispatch();
  return (
    <Button
      type="button"
      variant={classChannelActive}
      className="w-100 rounded-0 text-start text-truncate"
      onClick={() => {
        dispatch(setCurrentChannelId(channel.id));
      }}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
};

const ChannelsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelector);
  const currentChannelId = useSelector(channelIdSelector);
  const handleClickMenu = (type, item) => () => {
    dispatch(setModal({ type, item }));
  };
  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channels.map((channel) => {
        const classChannelActive = channel.id === currentChannelId ? 'secondary' : '';
        return (
          <li key={channel.id} className="nav-item w-100">
            {channel.removable ? (
              <Dropdown as={ButtonGroup} className="d-flex">
                <ButtonChannel classChannelActive={classChannelActive} channel={channel} />
                <Dropdown.Toggle variant={classChannelActive} split className="flex-grow-0" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={handleClickMenu('removing', channel)}>{t('remove')}</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={handleClickMenu('renaming', channel)}>{t('rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <ButtonChannel classChannelActive={classChannelActive} channel={channel} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

const ChannelsContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(setModal({ type: 'adding' }))}>
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>

        </button>
      </div>
      <ChannelsList />
    </>
  );
};

export default ChannelsContainer;
