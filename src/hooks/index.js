import { useContext } from 'react';

import { ApiContext, AuthContext } from '../contexts/index.js';

export const useApi = () => useContext(ApiContext);
export const useAuth = () => useContext(AuthContext);
