import React from "react";
import NavigationMenu from "./NavigationMenu/NavigationMenu";
import { Provider } from "react-redux";
import { store } from "../../services/redux";

function App() {
  return (
    <Provider store={store}>
      <NavigationMenu></NavigationMenu>
    </Provider>
  );
}

export default App;
