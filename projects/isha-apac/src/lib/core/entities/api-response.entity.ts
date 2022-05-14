export class ApiResponseEntity<T> {
  statusCode:
    | 'SUCCESS'
    | 'ERROR'
    | 'ERROR_RESOURCE_INCORRECT'
    | 'ERROR_OVERFLOW'
    | 'ASYNC_CALL_SUBMITTED' = 'SUCCESS';
  userFriendlyMessage = '';
  object: T | undefined;
}
