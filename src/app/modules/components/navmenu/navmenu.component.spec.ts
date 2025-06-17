import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../core/services/auth.service';

import { NavmenuComponent } from './navmenu.component';
import { MatNavList } from '@angular/material/list';

describe('NavmenuComponent', () => {
  let component: NavmenuComponent;
  let fixture: ComponentFixture<NavmenuComponent>;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavmenuComponent],
        imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatNavList
      ],
      providers: [AuthService]
    })
    .compileComponents();
    service = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(NavmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
