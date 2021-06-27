import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { PlusSquare } from 'react-bootstrap-icons';
import { actions } from '../slices';
import Channel from './Channel.jsx';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const handleChooseChannel = (channelId) => () => {
    dispatch(actions.setCurrentChannel({ channelId }));
  };
  const handleAddChannel = () => {
    dispatch(actions.openModal({ type: 'addChannel' }));
  };
  const handleRemoveChannel = (channelId) => () => {
    dispatch(actions.openModal({ type: 'removeChannel', extra: { channelId } }));
  };
  const handleRenameChannel = (channelId) => () => {
    dispatch(actions.openModal({ type: 'renameChannel', extra: { channelId } }));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleAddChannel}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelId}
            handleChoose={handleChooseChannel(channel.id)}
            handleRemove={handleRemoveChannel}
            handleRename={handleRenameChannel}
          />
        ))}
      </ul>
    </>
  );
};

export default ChannelsBox;
