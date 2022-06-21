import { environment } from '../../environments/environment';

export const BaseUrl = `${environment.apiUrl}/Jwt`;
export const JwtUrl = {
  GenerateToken: `${BaseUrl}/GenerateToken`,
  CheckJwt: `${BaseUrl}/CheckJwt`,
}
