import React from "react";
import { Route, Router, Switch, useHistory } from "react-router";

import Extraction from "./pages/TextExtractionPage";
import BasePage from "./components/BasePage";

export default () => {
  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route path={"/"} component={Extraction} />

        <Route>
          <BasePage>404 Not Found</BasePage>
        </Route>
      </Switch>
    </Router>
  );
};
