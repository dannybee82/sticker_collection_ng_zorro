import { Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { Observable } from "rxjs";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from "ng-zorro-antd/modal"
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';;
import { DeleteModal } from '../../models/dialogs/delete-modal.interface';
import { Sticker } from '../../models/sticker/sticker.interface';

@Component({
  selector: 'app-delete-dialog',
  imports: [NzModalModule, NzButtonModule, NzIconModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.sass',
})
export class DeleteDialogComponent {

  sticker: InputSignal<Sticker> = input.required<Sticker>();

  confirm: OutputEmitterRef<Sticker | undefined> = output<Sticker | undefined>();

  private modal = inject(NzModalService);
  
  delete(sticker: Sticker): void {
    const modalData: DeleteModal = {
      title: 'Delete Sticker',
      htmlContent: `<p>Do you want to delete Sticker below?</p><br><b>${sticker.title}</b>`,
      okButton: 'Delete Sticker',
      cancelButton: 'Cancel'
    }

    this.showDeleteConfirm(modalData).subscribe((confirmed: boolean | undefined) => {
      if (confirmed) {  
        // User clicked OK - delete the sticker
        this.confirm.emit(this.sticker());
      } else {  
        // User clicked Cancel or closed modal
        this.confirm.emit(undefined);
      }  
    });
  }

  showDeleteConfirm(data: DeleteModal): Observable<boolean> {
    const modalRef = this.modal.confirm<boolean>({
      nzTitle: data.title,
      nzContent: data.htmlContent,
      nzOkText: data.okButton ? data.okButton : 'OK',
      nzOkType: data.okType ? data.okType : 'primary',
      nzOkDanger: true,
      nzOnOk: () => true,
      nzCancelText: data.cancelButton ? data.cancelButton : 'Cancel',
      //nzOnCancel = this is completely optional and can be commented out.
      //nzOnCancel: () => false,
    });

    return modalRef.afterClose;
  }

}
