import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DayjsDateService, NotificationService } from '@isha-apac/ngx-cli-library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  get date() {
    return this.dateService.formatDate(new Date());
  }

  myGroup!: FormGroup;

  title = 'ngx-cli-library-test';
  /**
   *
   */
  constructor(private notificationService: NotificationService, private dateService: DayjsDateService) {}
  ngOnInit(): void {
    this.myGroup = new FormGroup({
      searchKey: new FormControl()
    });
  }

  showToastNotification() {
    this.notificationService.success('this is success toast notification');
  }
}
