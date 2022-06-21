import HttpStatusCode from "./http-status-code.enum";

export class WebApiResponse<T> {
  data: T;
  errorMessage: string;
  infoMessage: string;
  statusCode: HttpStatusCode;
}
