import { tick } from '../util/tick';

export async function waitForSubmission() {
  // wait for form submission on IE-11
  await tick();
  await tick();
}
