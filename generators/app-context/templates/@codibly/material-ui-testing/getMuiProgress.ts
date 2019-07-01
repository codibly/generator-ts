export function getMuiProgress(container = document.body): HTMLElement {
  return container.querySelector('[role="progressbar"]') as HTMLDivElement;
}
