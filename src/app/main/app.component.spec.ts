import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { LoggerService } from './core/services/logger.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoggerService', ['info']);

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: LoggerService, useValue: spy }],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    loggerServiceSpy = TestBed.inject(
      LoggerService
    ) as jasmine.SpyObj<LoggerService>;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set localStorage and log message on ngOnInit', () => {
    component.ngOnInit();

    expect(localStorage.getItem('auth_token')).toBe('utkhsjh9080g');
    expect(localStorage.getItem('isAdmin')).toBe('true');
    expect(loggerServiceSpy.info).toHaveBeenCalledWith(
      'User Admin has logged in to MySite360 user interface'
    );
  });

  it('should remove isAdmin from localStorage and log on ngOnDestroy', () => {
    localStorage.setItem('isAdmin', 'true');
    component.ngOnDestroy();

    expect(localStorage.getItem('isAdmin')).toBeNull();
    expect(loggerServiceSpy.info).toHaveBeenCalledWith(
      'Local storage variable isAdmin has been removed!'
    );
  });
});
