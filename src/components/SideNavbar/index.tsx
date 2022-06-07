import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { FaUsers } from 'react-icons/fa';
import { BiStoreAlt } from 'react-icons/bi';
import { FcInspection } from 'react-icons/fc';
import { GrCertificate } from 'react-icons/gr';
import Cookies from 'js-cookie';

import styles from './styles.module.scss';

import SidebarArrowIcon from 'assests/images/svgs/icon-sidebar-arrow.svg';
import { routePaths } from 'constants/common';
import { USER_INFO } from 'constants/auth';

const { SubMenu } = Menu;

interface IRoutes {
  key: string;
  text: string;
  url?: string;
  icon: any;
  children?: IRoute[];
}

interface IRoute {
  key: string;
  text: string;
  url: string;
}

const SideNavbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const role = JSON.parse(Cookies.get(USER_INFO) || '')?.role || 'ROLE_ADMIN';

  const [selectedKey, setSelectedKey] = useState('1');
  const [openKeys, setOpenKeys] = useState(['1']);

  useEffect(() => {
    (role === 'ROLE_ADMIN' ? routes : routesExperts).forEach((route: IRoutes) => {
      if (location.pathname.startsWith(route.url || '####')) {
        setSelectedKey(route.key);
        setOpenKeys([route.key]);
      }

      if (route.children) {
        route.children.forEach((routeChild: IRoute) => {
          if (location.pathname.startsWith(routeChild.url || '####')) {
            setSelectedKey(routeChild.key);
            setOpenKeys([route.key]);
          }
        });
      }
    });
  }, [location.pathname]);

  const onOpenChange = (keys: any) => {
    const routeKeys = (role === 'ROLE_ADMIN' ? routes : routesExperts).map((route: IRoutes) => route.key);

    const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);

    if (routeKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const routes: IRoutes[] = [
    {
      key: '1',
      text: 'Account Users',
      icon: <FaUsers />,
      children: [
        {
          key: '1.1',
          text: 'Active',
          url: routePaths.accountUsersActive,
        },
        {
          key: '1.2',
          text: 'Pending',
          url: routePaths.accountUsersPending,
        },
      ],
    },
    {
      key: '2',
      text: 'Stores',
      icon: <BiStoreAlt />,
      children: [
        {
          key: '2.1',
          text: 'Manufacturing',
          url: routePaths.storesManufacturing,
        },
        {
          key: '2.2',
          text: 'Restaurant',
          url: routePaths.storesRestaurant,
        },
      ],
    },
    {
      key: '3',
      text: 'Certificates',
      url: routePaths.certificates,
      icon: <GrCertificate />,
    },
    {
      key: '4',
      text: 'Inspection',
      icon: <FcInspection />,
      children: [
        {
          key: '4.1',
          text: 'In Process',
          url: routePaths.inspectionInProcess,
        },
        {
          key: '4.2',
          text: 'Pending',
          url: routePaths.inspectionPending,
        },
      ],
    },
  ];

  const routesExperts: IRoutes[] = [
    {
      key: '11',
      text: 'Store In Handle',
      url: routePaths.expertStoreInHandle,
      icon: <BiStoreAlt />,
    },
    {
      key: '12',
      text: 'Inspection',
      url: routePaths.expertStoreInspection,
      icon: <FcInspection />,
    },
  ];

  return (
    <div
      className={styles.sideNavbar}
      style={{
        minWidth: collapsed ? 80 : 240,
        width: collapsed ? 80 : 240,
        transition: 'width 0.3s',
      }}
    >
      <div className={styles.logo}>
        <div className={styles.imageLogo}>{!collapsed && 'Dashboard'}</div>

        <div
          className={classnames(styles.sidebarArrow, {
            [styles.collapsedArrow]: collapsed,
          })}
          onClick={() => setCollapsed(!collapsed)}
        >
          <img src={SidebarArrowIcon} alt="" />
        </div>
      </div>

      <Menu
        inlineCollapsed={collapsed}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={[selectedKey]}
        mode="inline"
      >
        {(role === 'ROLE_ADMIN' ? routes : routesExperts).map((route: IRoutes) => {
          if (route.children) {
            return (
              <SubMenu key={route.key} icon={route.icon} title={route.text}>
                {route.children?.map((childRoute: IRoute) => (
                  <Menu.Item key={childRoute.key}>
                    <Link to={childRoute.url}>{childRoute.text}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          }

          return (
            <Menu.Item icon={route.icon} key={route.key}>
              <Link to={route?.url || ''}>{route.text}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default SideNavbar;
