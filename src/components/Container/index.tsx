import React, { FC } from 'react';

import styles from './style.module.css';

/**
 * Container with default margin or padding
 */
const Container: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
