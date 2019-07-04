// tslint:disable:no-console
const consoleError = console.error;

export function muteErrors() {
  console.error = jest.fn();
}

export function unmuteErrors() {
  console.error = consoleError;
}
