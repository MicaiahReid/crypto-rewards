import React from "react";
import NavigationMenu from "./NavigationMenu/NavigationMenu";
import { Provider } from "react-redux";
import { store } from "../../services/redux";
import Link from "@material-ui/core/Link";

function App() {
  return (
    <Provider store={store}>
      <div
        stytle={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NavigationMenu></NavigationMenu>
        <div
          style={{
            display: "flex",
            marginTop: 8,
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 13,
              marginRight: 4,
            }}
          >
            Have a suggestion for another chanllenge?{" "}
            <u>
              <Link
                style={{
                  color: "black",
                  fontSize: 13,
                  fontWeight: "800",
                  underline: true,
                }}
                href="https://github.com/"
              >
                Submit one here.
              </Link>
            </u>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
