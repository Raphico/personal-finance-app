export function asyncHandler(handler) {
  return function (request, response, next) {
    Promise.resolve(handler(request, response, next)).catch((error) =>
      next(error)
    );
  };
}
