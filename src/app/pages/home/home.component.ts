import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { StickerService } from '../../services/sticker.service';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Sticker } from '../../models/sticker/sticker.interface';
import { AsyncPipe } from '@angular/common';
import { SharedAfterViewInit } from '../../shared/shared-after-view-init';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-home',
  imports: [NzCarouselModule, AsyncPipe, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends SharedAfterViewInit implements OnInit, AfterViewInit {

  carouselItems$?: Observable<Sticker[]>;
  loading$ = new BehaviorSubject<boolean>(true);

  private stickerService = inject(StickerService);

  ngOnInit(): void {
    this.carouselItems$ = this.stickerService.getRandomStickers().pipe(
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

}