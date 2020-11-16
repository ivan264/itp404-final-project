import {createContext} from "react";

// https://stackoverflow.com/questions/50502664/how-to-update-the-context-value-in-provider-from-the-consumer
const loggedContext = createContext({
  isAdmin : false,
  setIsAdmin: (auth) => {}
});

export default loggedContext;