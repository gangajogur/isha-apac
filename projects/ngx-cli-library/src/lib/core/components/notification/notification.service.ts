import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackbar: MatSnackBar) {}

  success(msg: string, autoHide?: boolean) {
    this.show(msg + 'yayyyyy', 'success', autoHide ? 3000 : -1);
  }

  msg(msg: string, autoHide?: boolean) {
    this.show(msg, 'info', autoHide ? 3000 : -1);
  }

  info(msg: string, autoHide?: boolean) {
    this.show(msg, 'info', autoHide ? 3000 : -1);
  }

  error(msg: string, autoHide?: boolean) {
    this.show(msg, 'error', autoHide ? 3000 : -1);
  }

  show(msg: string, type: 'success' | 'info' | 'error', duration: number = -1) {
    // this.translate.get(msg).subscribe((val) => {
    this.snackbar.openFromComponent(NotificationComponent, {
      data: { msg, type },
      panelClass: type,
      duration,
      verticalPosition: 'top'
    });
    // });
  }

  hide() {
    this.snackbar.dismiss();
  }
}
