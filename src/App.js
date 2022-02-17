import  { Component, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router ,
  HashRouter ,
  Route,
  Link,
  Routes,
  Navigate,
} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import './scss/style.scss';
import routes from './routes';
import {Cookies} from './cookies';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
    Fallback
  </div>
);

// Containers
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = lazy(() => import('./views/pages/login/login'));
const Signup = lazy(() => import('./views/pages/signup/signup'));
const Page404 = lazy(() => import('./views/pages/page404/Page404'));
const Page500 = lazy(() => import('./views/pages/page500/Page500'));
const Dashboard = lazy(() => import('./views/dashboard/Dashboard'));



export const PrivateRoute: React.FC<Props> = ({
    component: Component
    }) => {
    const access_token = Cookies.get("access_token")
    if (access_token){
        return <Component />;
    }
    return <Navigate to="/login" />

};


export function App() {
    return (
        <Router basename ="/">
            <Suspense fallback={loading}>
                <Routes>
                    <Route exact path="/login" element= <Login /> />
                    <Route exact path="/signup" element= <Signup /> />
                    <Route path="*" element={<PrivateRoute  component = {DefaultLayout} />} />
                </Routes>
            </Suspense>
        </Router>
    )
}


