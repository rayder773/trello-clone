import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const RouteWrapper = (props) => {
  const {
    component: Component, layout: Layout, path, ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={
        () => (
          <Layout>
            <Component />
          </Layout>
        )
      }
    />
  );
};

RouteWrapper.propTypes = {
  component: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default RouteWrapper;
