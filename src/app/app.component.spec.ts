import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoggerService } from './main/core/services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageKey } from './main/core/models/enums';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;

  beforeEach(async () => {
    loggerServiceSpy = jasmine.createSpyObj('LoggerService', ['info']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: LoggerService, useValue: loggerServiceSpy },
        { provide: ToastrService, useValue: {} }, // <-- Add this line to mock ToastrService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set auth_token and isAdmin in localStorage and log message on init', () => {
    component.ngOnInit();
    expect(localStorage.getItem(LocalStorageKey.AuthToken)).toBe(
      'utkhsjh9080g'
    );
    expect(localStorage.getItem(LocalStorageKey.IsAdmin)).toBe('true');
    expect(loggerServiceSpy.info).toHaveBeenCalledWith(
      'User Admin has logged in to user interface'
    );
  });

  it('should remove isAdmin from localStorage and log message on destroy', () => {
    localStorage.setItem(LocalStorageKey.IsAdmin, 'true');
    component.ngOnDestroy();
    expect(localStorage.getItem(LocalStorageKey.IsAdmin)).toBeNull();
    expect(loggerServiceSpy.info).toHaveBeenCalledWith(
      'Local storage variable isAdmin has been removed!'
    );
  });
});
