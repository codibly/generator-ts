import { waitTime } from './waitTime';

export async function waitForCondition(
  condition: () => boolean,
  timeout = 5000,
  interval = 1
): Promise<boolean> {
  let time = 0;

  while (time < timeout) {
    if (condition()) {
      return true;
    }

    await waitTime(interval);
    time += interval;
  }

  throw new Error(`Timeout in waiting for condition ${condition.toString()}`);
}
