import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq= req.clone({
    url: `${environment.backend_api}${req.url}`
  });
  return next(newReq);
};
