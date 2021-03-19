import { ResponseStatuses } from 'utils/const'

export const checkUnauthorizedStatus = error => {
  const responseStatus = error?.response?.status
  return responseStatus && !Number.isNaN(+responseStatus) && +responseStatus === ResponseStatuses.UNAUTHORIZED
}
