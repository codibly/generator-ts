// tslint:disable:no-console
// mock redirects
window.location.assign = jest.fn((location) => console.log(`changed location to: ${location}`));
window.location.replace = jest.fn((location) => console.log(`replaced location to: ${location}`));
