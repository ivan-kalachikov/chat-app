import { useContext } from 'react';
import AuthContext, { getAuth, setAuth } from './AuthContext.jsx';
import UsernameContext from './UsernameContext.jsx';
import SocketInstanceContext from './SocketInstanceContext.jsx';

const useAuth = () => useContext(AuthContext);
const useUsername = () => useContext(UsernameContext);
const useSocketInstance = () => useContext(SocketInstanceContext);

export {
  AuthContext,
  UsernameContext,
  SocketInstanceContext,
  useAuth,
  useUsername,
  useSocketInstance,
  getAuth,
  setAuth,
};
