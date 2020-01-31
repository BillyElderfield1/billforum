import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.scss";
import { Switch, Route } from "react-router-dom";
import Test from "./components/Test";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./components/NavBar";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "./state/user/actions";

function App(){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  });

  return (
    <Container fluid className="text-center justify-content-center align-items-center">
      <ConnectedRouter history={history}>
      <Row>
        <Col className="px-0">
          <NavBar />
        </Col>
      </Row>
      <Row className="py-3">
        <Col className="" sm={{ span: 5, offset: 3 }}>
          <Switch>
            <Route path="/" exact component={Test} />
            <Route path="/forum" component={Test} />
            <Route path="/test" component={Test} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={PageNotFound} />
          </Switch>
        </Col>
      </Row>
      </ConnectedRouter>
    </Container>
  );
}

export default App;
