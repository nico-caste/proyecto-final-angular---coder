import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../../core/services/auth.service';
import { StoreModule } from '@ngrx/store';
import { StudentsComponent } from './students.component';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsComponent],
        imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      providers: [AuthService]
    })
    .compileComponents();
    service = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
