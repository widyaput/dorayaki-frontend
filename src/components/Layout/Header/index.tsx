import { Button, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { ReactNode, useMemo } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import Container from '@/components/Container';
import { headerHeight, headerUpperPartHeight } from '@/config/size';

import routes from './routes';
import axios from '@/modules/axios';
import { DEFAULT_API_PREFIX } from '@/config/default';

const LayoutHeader: React.FC = () => {
  const history = useHistory();

  const handleSignOut = async () => {
    const res = await axios.post(`${DEFAULT_API_PREFIX}/signout`);
    if (res.status === 200) history.push('/login');

    // history.push('/login');
  };

  return (
    <Header
      className="header"
      style={{
        height: headerHeight
      }}
    >
      <div
        className="upperPart"
        style={{
          height: headerUpperPartHeight
        }}
      >
        <Container className="flex justify-between items-center">
          <div>
            <img src="/images/dorayaki-603502.png"
            className="image-layout"
            style={{height: 'auto', width: '10%', float:'left', paddingTop: '10px'}}
            alt="Logo" />
            <h1 className="logo-name" style={{paddingTop:'5px'}}>WeeDorayaki</h1>
          </div>
          <Button className="signoutButton" type="primary" onClick={handleSignOut}>
            <FiLogOut className="signoutLogo" />
            Sign out
          </Button>
        </Container>
      </div>
      <div className="bottomPart">
        <Container>
          <Menu theme="light" mode="horizontal">
            {routes.map((route, idx) => (
              <NavItem key={idx} {...route} />
            ))}
          </Menu>
        </Container>
      </div>
    </Header>
  );
};

export interface NavItemProps {
  icon: ReactNode;
  name: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, name, to }) => {
  const history = useHistory();
  const isActive = useMemo(() => {
    if (history.location.pathname === to) {
      return true;
    }
    return false;
  }, [history.location.pathname]);

  return (
    <Link to={to}>
      <Menu.Item key={to} className={`navItemContainer ${isActive ? 'active' : ''}`}>
        <div className="navItemContent">
          {icon}
          <span>{name}</span>
        </div>
      </Menu.Item>
    </Link>
  );
};

export default LayoutHeader;
