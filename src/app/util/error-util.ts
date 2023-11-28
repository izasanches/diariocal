import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ErrorUtil {
  public static handleError(error: HttpErrorResponse) {
    console.log('handleError');
    let errorMessage = '';
    console.log(error);
    
    if (error instanceof Error || error instanceof ErrorEvent) {
      console.error('cliente');
      errorMessage = 'Opsss! Um problema inesperado aconteceu! (lado cliente)';
    } else {
      console.error('servidor');
      errorMessage = ErrorUtil.getServerErrorMessage(error);
    }

    return throwError(new Error(errorMessage));

  }

  private static getServerErrorMessage(error: HttpErrorResponse) {
    switch (error.status) {
      case 404: {
        return `O recurso informado não foi encontrado!`;
      }
      case 403: {
        return `O acesso foi negado!`;
      }
      case 500: {
        return `Oppsss! Um erro inesperado aconteceu!`;
      }
      default: {
        return `Oppsss! Um erro inesperado aconteceu! Tente novamente mais tarde!`;
      }
    }
  }
}