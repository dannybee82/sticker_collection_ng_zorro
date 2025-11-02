import { Injectable } from '@angular/core';
import { Sticker } from '../models/sticker/sticker.interface';
import { delay, Observable, of } from 'rxjs';

const RANDOM_AMOUNT_STICKERS: number = 4;

@Injectable({
  providedIn: 'root'
})
export class StickerService {
  
  private _allStickers: Sticker[] = [
    {
      id: 1,
      image: 'stickers/sticker_001.jpg',
      title: 'Abigaïl de Languedoc'
    },
    {
      id: 2,
      image: 'stickers/sticker_002.jpg',
      title: 'Matilda du Mal'
    },
    {
      id: 3,
      image: 'stickers/sticker_003.jpg',
      title: 'Saskia des Esseintes'
    },
    {
      id: 4,
      image: 'stickers/sticker_004.jpg',
      title: 'Miss Sapphire'
    },
    {
      id: 5,
      image: 'stickers/sticker_005.jpg',
      title: 'Time for Coffee'
    },
    {
      id: 6,
      image: 'stickers/sticker_006.jpg',
      title: 'Caitlin de Caen in the Thunderstorm'
    },
    {
      id: 7,
      image: 'stickers/sticker_007.jpg',
      title: 'Radiant Beauty'
    },
    {
      id: 8,
      image: 'stickers/sticker_008.jpg',
      title: 'Anna de Benign'
    },
    {
      id: 9,
      image: 'stickers/sticker_009.jpg',
      title: 'Lydia Lumière'
    },
    {
      id: 10,
      image: 'stickers/sticker_010.jpg',
      title: 'Victoria de la Mer'
    },
    {
      id: 11,
      image: 'stickers/sticker_011.jpg',
      title: 'Glamourous Beauty'
    },
    {
      id: 12,
      image: 'stickers/sticker_012.jpg',
      title: 'Jasmine Jolicœur'
    },
    {
      id: 13,
      image: 'stickers/sticker_013.jpg',
      title: 'Etheral Muse'
    },
    {
      id: 14,
      image: 'stickers/sticker_014.jpg',
      title: 'Juliette Wolpertinger'
    }    
  ];

  getAllStickers(): Observable<Sticker[]> {
    return of(this._allStickers).pipe(
      delay(1500)
    );
  }

  getStickerById(id: number): Observable<Sticker | undefined> {
    const index: number = this._allStickers.findIndex(item => item.id === id);
    const sticker: Sticker | undefined = index > -1 ? this._allStickers[index] : undefined;
    
    return new Observable<Sticker | undefined>(observer => {
      observer.next(sticker);
      observer.complete();
    });
  }

  getRandomStickers(): Observable<Sticker[]> {
    const randomNumbers: number[] = this.getRandomNumbers(RANDOM_AMOUNT_STICKERS);

    const arr: Sticker[] = [];
    
    randomNumbers.forEach(index => {
      arr.push(this._allStickers[index]);
    });

    return new Observable<Sticker[]>(observer => {
      observer.next(arr);
      observer.complete();
    }).pipe(
      delay(1500)
    );
  }

  createSticker(sticker: Sticker): Observable<void> {
    const nextId: number = Math.max(...this._allStickers.map(item => item.id)) + 1;
    sticker.id = nextId;
    this._allStickers.push(sticker);
    return new  Observable<void>(obs => {
      obs.next();
      obs.complete();
    });
  }

  updateSticker(sticker: Sticker): Observable<void> {
    const index: number = this._allStickers.findIndex(item => item.id === sticker.id);

    if(index > -1) {
      const update: Sticker = this._allStickers[index];
      update.title = sticker.title;
      update.image = sticker.image;
      this._allStickers[index] = update;
    }

    return new  Observable<void>(obs => {
      obs.next();
      obs.complete();
    });
  }

  deleteSticker(sticker: Sticker): Observable<boolean> {
    const index: number = this._allStickers.findIndex(item => item.id === sticker.id);
    let deleted: boolean = false;

    if(index > -1) {
      this._allStickers = this._allStickers.filter(s => s.id !== sticker.id);
      deleted = true;
    }

    return new Observable<boolean>(observer => {
      observer.next(deleted);
      observer.complete();
    });
  }

  private getRandomNumbers(amount: number): number[] {
    let arr: number[] = this._allStickers.map(i => i.id - 1);
    
    for(let i = 0; i < amount; i++) {
      let random: number = this.generateRandomNumber(0, arr.length - 1);

      let n1: number = arr[i];
      let n2: number = arr[random];

      arr[random] = n1;
      arr[i] = n2;
    }

    return arr.slice(0, amount);
  }

  private generateRandomNumber(min: number, max: number): number {
    return Math.floor((Math.random() * max)) + min;
  }

}