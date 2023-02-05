import ReactGA from 'react-ga';
// react-ga is a library for integrating Google Analytics into a React application. Google Analytics is a web analytics service provided by Google that allows you to track and analyze the traffic on your website.

const initGA = (trackingID, options) => {
  ReactGA.initialize(trackingID, { ...options });
};

const PageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

const Event = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export { initGA, PageView, Event };
