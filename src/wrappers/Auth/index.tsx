import { lazy, Suspense, useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

// import useProfile from 'hooks/useProfile';
import { TOKEN, USER_INFO } from 'constants/auth';
import { routePaths } from 'constants/common';

const Sidebar = lazy(() => import('components/SideNavbar'));
const PageHeader = lazy(() => import('components/PageHeader'));
const PageNotFound = lazy(() => import('components/PageNotFound'));
const Home = lazy(() => import('pages/Home'));

const AccountUsersPending = lazy(() => import('pages/Admin/AccountUsers/Pending'));
const AccountUsersActive = lazy(() => import('pages/Admin/AccountUsers/Active'));
const StoresManufacturing = lazy(() => import('pages/Admin/Stores/Manufacturing'));
const StoresRestaurant = lazy(() => import('pages/Admin/Stores/Restaurant'));
const Certificates = lazy(() => import('pages/Admin/Certificates'));
const InspectionInProcess = lazy(() => import('pages/Admin/Inspection/InProcess'));
const InspectionPending = lazy(() => import('pages/Admin/Inspection/Pending'));

const ExpertStoresManufacturing = lazy(() => import('pages/Expert/StoreInHandle'));
const ExpertInspection = lazy(() => import('pages/Expert/Inspection'));

const AuthComponent = () => {
  const role = JSON.parse(Cookies.get(USER_INFO) || '')?.role || 'ROLE_ADMIN';
  // const isAuthenticated = !!Cookies.get(TOKEN);
  const location = useLocation();
  // const { profile } = useProfile(isAuthenticated);

  const urlPaths = Object.values(routePaths);
  const isUrlPage = urlPaths.includes(location.pathname);

  // if (!isAuthenticated) return <Navigate to="/login" replace />;
  // if (!profile) return null;

  return (
    <div className={styles.authWrapper}>
      {isUrlPage && <Sidebar />}

      <div className={styles.mainWrapper}>
        {isUrlPage && <PageHeader />}

        <div className={styles.pageContentWrapper}>
          <Suspense fallback={null}>
            <Routes>
              <Route path="*" element={<PageNotFound />} />
              {role === 'ROLE_ADMIN' ? (
                <>
                  {/* Role Admin */}
                  <Route path={routePaths.accountUsersPending} element={<AccountUsersPending />} />
                  <Route path={routePaths.accountUsersActive} element={<AccountUsersActive />} />

                  <Route path={routePaths.storesManufacturing} element={<StoresManufacturing />} />
                  <Route path={routePaths.storesRestaurant} element={<StoresRestaurant />} />

                  <Route path={routePaths.certificates} element={<Certificates />} />

                  <Route path={routePaths.inspectionInProcess} element={<InspectionInProcess />} />
                  <Route path={routePaths.inspectionPending} element={<InspectionPending />} />
                </>
              ) : (
                <>
                  <Route path={routePaths.expertStoreInHandle} element={<ExpertStoresManufacturing />} />
                  <Route path={routePaths.expertStoreInspection} element={<ExpertInspection />} />
                </>
              )}
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
