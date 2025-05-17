import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

export enum ToastrMessageType {
  ERROR = -1,
  WARNING = 0,
  SUCCESS = 1,
  INFO = 2,
}

@Injectable({
  providedIn: 'root',
})
export class ToastrMessageWrapperService {
  constructor(private readonly toastr: ToastrService) {}

  public displayMessage(message: string, messageType: ToastrMessageType): void {
    const empty = '';
    const override = {
      disableTimeOut: false,
      positionClass: 'toast-bottom-right',
    };
    switch (messageType) {
      case ToastrMessageType.ERROR:
        this.toastr.error(message, empty, override);
        break;
      case ToastrMessageType.SUCCESS:
        this.toastr.success(message, empty, override);
        break;
      case ToastrMessageType.WARNING:
        this.toastr.warning(message, empty, override);
        break;
      case ToastrMessageType.INFO:
        this.toastr.info(message, empty, override);
        break;
    }
  }
}
