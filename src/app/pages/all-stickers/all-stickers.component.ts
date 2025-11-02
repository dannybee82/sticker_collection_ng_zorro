import { Component, inject, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageService, NzImageModule } from 'ng-zorro-antd/image';
import { StickerService } from '../../services/sticker.service';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Sticker } from '../../models/sticker/sticker.interface';
import { AsyncPipe } from '@angular/common';
import { SharedAfterViewInit } from '../../shared/shared-after-view-init';
import { ToTopComponent } from '../../components/to-top/to-top.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-all-stickers',
  imports: [NzGridModule, NzCardModule, NzImageModule, NzButtonModule, NzIconModule, ToTopComponent, SpinnerComponent, AsyncPipe],
  templateUrl: './all-stickers.component.html',
  styleUrl: './all-stickers.component.sass',
})
export class AllStickersComponent extends SharedAfterViewInit implements OnInit {

  allStickers?: Observable<Sticker[]>;
  loading$ = new BehaviorSubject<boolean>(true);

  private stickerService = inject(StickerService);
  private nzImageService = inject(NzImageService);

  ngOnInit(): void {
    this.allStickers = this.stickerService.getAllStickers().pipe(
      switchMap((data: Sticker[]) => {
        if(data) {
          this.loading$.next(false);
          return of(data);
        }
            
        this.loading$.next(false);
        return of([]);
      })
    );
  }

  showPreview(sticker: Sticker): void {
    const image = {
      src: sticker.image,
      alt: sticker.title
    }
    this.nzImageService.preview([image], { nzZoom: 1, nzRotate: 0, nzScaleStep: 0.5 });
  }

}
