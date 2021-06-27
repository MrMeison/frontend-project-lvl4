import { useContext } from 'react';
import ApiContext from '../contexts/apiContext.js';

const useApi = () => useContext(ApiContext);

export default useApi;
