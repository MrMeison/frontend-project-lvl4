import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import MyModal from './modals/index.jsx';
import ChannelsContainer from './Channels.jsx';
import MessagesContainer from './Messages.jsx';
import { setInitialState } from '../slices/channels.js';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';
import { modalSelector } from '../selectors.js';

const ChatPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalInfo = useSelector(modalSelector);
  const [error, setError] = useState(null);
  const [stateContent, setStateContent] = useState('waiting');

  const history = useHistory();

  useEffect(() => {
    // eslint-disable-next-line functional/no-let
    let didMount = true;

    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), {
          headers: auth.getAuthHeader(),
        });
        if (didMount) {
          setStateContent('loaded');
        }
        dispatch(setInitialState(data));
      } catch (e) {
        setStateContent('error');
        if (e.response.status === 401) {
          history.replace({ pathname: routes.loginPagePath() });
        }
        setError(t('errors.network'));
      }
    };
    fetchContent();

    return () => { didMount = false; };
  }, [auth, dispatch, setStateContent, history, t]);

  return stateContent !== 'waiting' ? (
    <div className="container h-100 my-4 overflow-hidden rounded shadow" aria-hidden={modalInfo.show}>
      {error ? <div className="position-absolute top-0 start-50 translate-middle-x w-25 alert alert-danger">{error}</div> : null}
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <ChannelsContainer />
        </div>
        <div className="col p-0 h-100">
          <MessagesContainer />
        </div>
      </div>
      <MyModal modalInfo={modalInfo} />
    </div>
  ) : <div className="alert alert-primary text-center my-4 overflow-hidden rounded shadow">{t('load')}</div>;
};

export default ChatPage;
