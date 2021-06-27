import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ChannelsList from './ChannelsList.jsx';
import Chat from './Chat.jsx';
import { actions } from '../slices';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';
import Modal from './Modal.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const auth = useAuth();
  useEffect(() => {
    // eslint-disable-next-line functional/no-let
    let didMount = true;
    const fetchData = async () => {
      try {
        const res = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
        if (didMount) setLoading(false);
        dispatch(actions.setInitialState(res.data));
      } catch (err) {
        if (!err.isAxiosError) {
          throw err;
        }

        if (err.response.status === 401) {
          history.push(routes.loginPagePath());
        }
      }
    };

    fetchData();

    return () => { didMount = false; };
  }, [dispatch, history]);

  return loading
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">{t('loading')}</span>
        </Spinner>
      </div>
    )
    : (
      <>
        <Modal />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
              <ChannelsList />
            </div>
            <div className="col p-0 h-100">
              <Chat />
            </div>
          </div>
        </div>
      </>
    );
};

export default ChatPage;
