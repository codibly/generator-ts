export async function waitTime(timeout: number = 0) {
  await new Promise((resolve) => setTimeout(resolve, timeout));
}
