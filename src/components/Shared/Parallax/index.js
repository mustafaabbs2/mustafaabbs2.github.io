import React, { useLayoutEffect } from 'react';
import { ParallaxBanner, useController } from 'react-scroll-parallax';
import PropTypes from 'prop-types';

const Parallax = props => {
  const { amount, className, children, image } = props;

  return (
    <ParallaxBanner
      className={className}
      layers={[
        {
          amount,
          image,
        },
      ]}
    >
      {children}
    </ParallaxBanner>
  );
};

Parallax.propTypes = {
  amount: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
};

Parallax.defaultProps = {
  className: '',
};

const ParallaxCache = () => {
  const { parallaxController } = useController();

  useLayoutEffect(() => {
    const handler = () => parallaxController.update();
    window.addEventListener('load', handler);
    return () => window.removeEventListener('load', handler);
  }, [parallaxController]);

  return null;
};

export { Parallax, ParallaxCache };
