import React from 'react';

import { Layout } from 'antd';
import LayoutHeader from './Header';
import { getHeaderHeightWithOffset } from '@/config/size';
const { Footer, Content } = Layout;

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const BaseLayout: React.FC<Props> = (props) => {
  return (
    <>
      <LayoutHeader />
      <Layout
        className="base-layout"
        style={{
          paddingTop: getHeaderHeightWithOffset(40)
        }}
      >
        <Content>{props.children}</Content>
        <Footer>Copyright © 2021 Widya Anugrah Putra. All rights reserved.</Footer>
      </Layout>
    </>
  );
};

export default BaseLayout;