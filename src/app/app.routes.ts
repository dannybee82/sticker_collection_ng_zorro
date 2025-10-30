import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AllStickersComponent } from './pages/all-stickers/all-stickers.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { CreateOrUpdateStickerComponent } from './pages/create-or-update-sticker/create-or-update-sticker.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'all-stickers',
                component: AllStickersComponent
            },
            {
                path: 'overview',
                component: OverviewComponent
            },
            {
                path: 'create-or-update-sticker/:id',
                component: CreateOrUpdateStickerComponent
            }
        ]
    }
];
