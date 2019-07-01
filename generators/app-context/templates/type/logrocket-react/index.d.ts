declare module 'logrocket-react' {
  import LogRocket from 'logrocket';

  function setupLogRocketReact(logger: typeof LogRocket): void;

  export default setupLogRocketReact;
}
