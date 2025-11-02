import { Component, input, InputSignal } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-spinner',
  imports: [NzSpinModule, NzIconModule, AsyncPipe],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.sass'
})
export class SpinnerComponent {

  isLoading: InputSignal<Observable<boolean>> = input.required<Observable<boolean>>();
  size: InputSignal<'small' | 'default' | 'large'>  = input.required<'small' | 'default' | 'large'>();
  altText: InputSignal<string> = input.required<string>();

}
