import {throwError} from "rxjs";

export class ExceptionUtil {
    public static handleError(error: any) {
        return throwError(error);
    }
}
