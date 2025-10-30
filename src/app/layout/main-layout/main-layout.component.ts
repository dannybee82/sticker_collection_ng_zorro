import { Component, inject, OnInit } from '@angular/core';
import { NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, RouterOutlet, MenuComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.sass',
})
export class MainLayoutComponent implements OnInit {

  private router = inject(Router);

  ngOnInit(): void {
    this.router.navigate(['home']);
  }

}