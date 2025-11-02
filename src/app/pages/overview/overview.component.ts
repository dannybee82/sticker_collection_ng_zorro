import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Sticker } from '../../models/sticker/sticker.interface';
import { StickerService } from '../../services/sticker.service';
import { AsyncPipe } from '@angular/common';
import { SharedAfterViewInit } from '../../shared/shared-after-view-init';
import { Router, RouterModule } from '@angular/router';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
import { MessageService } from '../../services/message.service';
import { ToTopComponent } from '../../components/to-top/to-top.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-overview',
  imports: [NzFlexModule, NzTableModule, NzDividerModule, NzButtonModule, NzIconModule, AsyncPipe, RouterModule, DeleteDialogComponent, ToTopComponent, SpinnerComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.sass',
})
export class OverviewComponent extends SharedAfterViewInit implements OnInit {

  pageSize: WritableSignal<number> = signal(5);

  allStickers$?: Observable<Sticker[]>;
  loading$ = new BehaviorSubject<boolean>(true);

  private stickerService = inject(StickerService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.getAllStickers();
  }  

  changePageSize(pageSize: number): void {
    this.pageSize.set(pageSize);
  }

  editSticker(id: number): void {
    this.router.navigate(['/create-or-update-sticker', id]);
  }

  deleteSticker(sticker: Sticker | undefined): void {
    if(sticker) {
      this.stickerService.deleteSticker(sticker).subscribe({
        next: (isDeleted: boolean) => {
          if(isDeleted) {
            this.messageService.success('Sticker deleted');
          } else {
            this.messageService.error('Can\'t delete Sticker');
          }
        },
        error: () => {
          this.messageService.error('Can\'t delete Sticker');
        },
        complete: () => {
          this.allStickers$
          this.getAllStickers();
        }
      });
    }
  }

  private getAllStickers(): void {
    this.allStickers$ = this.stickerService.getAllStickers().pipe(
      switchMap((data: Sticker[]) => {
        if(data) {
          this.loading$.next(false);
          return of(structuredClone(data.reverse()));
        }
            
        this.loading$.next(false);
        return of([]);
      })
    );
  }

}
