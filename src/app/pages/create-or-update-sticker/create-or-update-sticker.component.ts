import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NonNullableFormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, FormGroup, Validators } from '@angular/forms';
import { SharedAfterViewInit } from '../../shared/shared-after-view-init';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadFile, NzUploadModule, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { StickerService } from '../../services/sticker.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Sticker } from '../../models/sticker/sticker.interface';
import { EMPTY, from, Observable, of, Subscription, switchMap } from 'rxjs';
import { MessageService } from '../../services/message.service';

const getBase64 = (file: File): Promise<string | null> =>
  new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => {
      resolve(fr.result as string);
    }
    fr.readAsDataURL(file);
});

@Component({
  selector: 'app-create-or-update-sticker',
  imports: [FormsModule, ReactiveFormsModule, NzFlexModule, NzButtonModule, NzFormModule, NzIconModule, NzModalModule, NzUploadModule],
  templateUrl: './create-or-update-sticker.component.html',
  styleUrl: './create-or-update-sticker.component.sass',
})
export class CreateOrUpdateStickerComponent extends SharedAfterViewInit implements OnInit {

  stickerForm: UntypedFormGroup = new FormGroup({});
  isUpdateMode: WritableSignal<boolean> = signal(false);
  private _updateSticker: WritableSignal<Sticker | undefined> = signal(undefined);

  fileList: NzUploadFile[] = [];
  previewImage: string | undefined | null = '';
  orignalImage: string = '';
  previewVisible = false;

  private fb = inject(NonNullableFormBuilder);
  private stickerService = inject(StickerService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.stickerForm = this.fb.group({
      title: ['', [Validators.required]]
    });

    this.activeRoute.params.subscribe((params: Params) => {
      if(params['id']) {
        const id: number = parseInt(params['id'] ?? '0');

        if(!isNaN(id)) {
          this.getById(id);
        }
      }
    });
  }

  submitForm(): void {
    if(this.stickerForm.valid) {
      const base64: Observable<string | null> = this.isUpdateMode() ? 
          this.fileList.length > 0 ? from(getBase64(this.fileList[0].originFileObj!)) :                   
          of(this._updateSticker()!.image) : 
        from(getBase64(this.fileList[0].originFileObj!));

      const data: Observable<Sticker | null> = base64.pipe(
        switchMap((base64: string | null) => {
          if(base64) {
            const data: Sticker = {
              id: this.isUpdateMode() ? this._updateSticker()!.id : 0,
              title: this.stickerForm.get('title')?.value,
              image: base64
            };

            return of(data);
          }

          return of(null);
        })
      );

      const action$: Observable<void> = data.pipe(
        switchMap((data: Sticker | null) => {
          if(data) {
            return this.isUpdateMode() ?
              this.stickerService.updateSticker(data) :
              this.stickerService.createSticker(data);
          }
          return EMPTY;         
        })
      );

      action$.subscribe({
        next: () => {
          this.messageService.success(this.isUpdateMode() ? 'Sticker updated successfully' : 'Sticker created successfully');
        },
        error: () => {
          this.messageService.error(this.isUpdateMode() ? 'Can\'t update Sticker' : 'Can\'t create Sticker');
        },
        complete: () => {
          this.router.navigate(['/overview']);
        }
      });
    } else {
      this.stickerForm.markAllAsDirty();
    }
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;    
  };

  customUploadRequest = (item: NzUploadXHRArgs): Subscription => {        
    // Simulate successful upload  
    setTimeout(() => {  
      item.onSuccess!({}, item.file, {});  
    }, 1000);  
      
    return new Subscription();  
  };

  private getById(id: number): void {
    this.stickerService.getStickerById(id).subscribe({
      next: (data: Sticker | undefined) => {
        this._updateSticker.set(data);
      },
      error: () => {
        this.messageService.error('Can\'t get Sticker by id.');
      },
      complete: () => {
        if(this._updateSticker()) {
          this.stickerForm.patchValue(this._updateSticker()!);
          this.orignalImage = this._updateSticker()!.image;
          this.isUpdateMode.set(true);          
        }
      }
    });
  }

}