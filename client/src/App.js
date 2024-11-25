import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Create from "./elements/Create";
import Edit from "./elements/Edit";
import Home from "./elements/Home";
import Read from "./elements/Read";
import CreateSubscription from "./elements/CreateSubscription";
import Subs from "./component/subscription.jsx";
import Navbar from "./component/navbar.jsx";
import Login from "./component/login";
import Signup from "./component/signup.jsx";
import Hero from "./component/hero.jsx";
import Footer from "./component/footer.jsx";
import Books from "./component/books.jsx";
import PrivateRoute from "./component/PrivateRoute"; // Import komponen PrivateRoute
import Subscriptions from "./elements/Subscription";
import EditSubscription from "./elements/EditSubscription";
import ReadSubscription from "./elements/ReadSubscription";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero /> <Subs /> <Books /> <Footer />{" "}
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <Create />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-subscription"
            element={
              <PrivateRoute>
                <CreateSubscription />
              </PrivateRoute>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <PrivateRoute>
                <Subscriptions />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-subscription/:id"
            element={
              <PrivateRoute>
                <EditSubscription />
              </PrivateRoute>
            }
          />

          <Route
            path="/read-subscription/:id"
            element={
              <PrivateRoute>
                <ReadSubscription />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <Edit />
              </PrivateRoute>
            }
          />
          <Route
            path="/read/:id"
            element={
              <PrivateRoute>
                <Read />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
