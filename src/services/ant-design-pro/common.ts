export const handler = function<R> (response: API.Response): R {
  if (response.success) {
    return response.data
  }
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw response.message
};
