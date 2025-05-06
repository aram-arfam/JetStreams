import { createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const JetContext = createContext();

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    backendUrl,
  };

  return <JetContext.Provider value={value}>{children}</JetContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
