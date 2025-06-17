import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../core/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DashboardComponent } from './dashboard.component';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { NavmenuComponent } from '../navmenu/navmenu.component';
import { MatNavList } from '@angular/material/list';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: AuthService;
  const mockAuthService = {
    authUser$: new BehaviorSubject(null)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        NavmenuComponent
      ],
        imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatToolbarModule,
        MatIcon,
        MatDrawerContainer,
        MatDrawer,
        MatNavList
      ],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    })
    .compileComponents();
    service = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
