import React from 'react';
import { Helmet } from 'react-helmet';
import swr from 'swr';

import AuthLayout from '@/components/Layout/Auth';
import { getUser } from './service';
import { Typography } from 'antd';

const Home: React.FC = () => {
  const { key, fetcher } = getUser();
  const { data, error } = swr(key, fetcher);
  return (
    <AuthLayout>
      <Helmet>
        <title>WeeDorayaki | Home</title>
      </Helmet>
      {data &&
        <main>
          <section className="container flex justify-between mb-10">
            <div>
              <Typography.Title level={1}>
                {`Welcome, ${data.data.username}!`}
              </Typography.Title>
              <h2>WeeDorayaki is an content management system created for <i>Stand with Dorayaki</i>.</h2>
              <h2>With this CMS, you can add, edit delete and view shops and dorayakis of our company.</h2>
            </div>
            <div>
              <figure style={{margin: 'auto'}}>
                <img
                  style={{paddingLeft: '15px'}}
                  src="https://lh5.googleusercontent.com/rP5XVjNcM8SGuRcT1tyzTztzxrJLmCXHKkb4rstUF5nY3U9Sa7e64I-hDkDFpeNvoUESOvmMfVFbvIc7RMnbK2tBzBJ3KFvSG0vycFPszsHoW7qAwMCAglgQ-q6dGAUy74RdI3hL" 
                  alt="Doremonangis"
                  
                  />
                <figcaption style={{textAlign: 'center'}}>
                  <i>Doremonangis and Dorayaki, colorized (2021)</i>
                </figcaption>  
              </figure>
            </div>
          </section>
        </main>
      }
    </AuthLayout>
  );
};

export default Home;
