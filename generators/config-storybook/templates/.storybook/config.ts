import { addParameters, configure } from '@storybook/react';

const req = require.context('../src', true, /\.story\.tsx$/);

/**
 * Configure parameters
 */
addParameters({
  options: {
    addonPanelInRight: true
  }
});

/**
 * Load stories
 */
function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
