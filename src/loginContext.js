import {createContext} from "react";

const loggedContext = createContext({
  isAdmin : false,
  setIsAdmin: (auth) => {}
});

export default loggedContext;