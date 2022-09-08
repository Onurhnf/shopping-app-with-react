import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, Suspense } from "react";
import React from "react";
///Components
import Spinner from "./components/UI/Spinner";
import Layout from "./components/Layout/Layout";
import HomePage from "./RoutePages/pages/HomePage";

const AuthPage = React.lazy(() => import("./RoutePages/pages/AuthPage"));
const ProfilePage = React.lazy(() => import("./RoutePages/pages/ProfilePage"));
const ListPage = React.lazy(() => import("./RoutePages/pages/ListPage"));
const NotFound = React.lazy(() => import("./RoutePages/pages/NotFound"));

let firstRun = true;
function App() {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (firstRun) {
      firstRun = false;
      return;
    } else {
      //console.log(user);
    }
  }, [user]);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <Spinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!user.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
          {user.isLoggedIn && (
            <Route path="/profile" element={<ProfilePage />} />
          )}
          {user.isLoggedIn && <Route path="/list" element={<ListPage />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
