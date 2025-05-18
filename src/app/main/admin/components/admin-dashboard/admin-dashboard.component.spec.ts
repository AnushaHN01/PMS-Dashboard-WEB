import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import {
  ToastrMessageWrapperService,
  ToastrMessageType,
} from '../../../shared/services/toastr-message-wrapper.service';
import { LoggerService } from '../../../core/services/logger.service';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let mockToastrService: jasmine.SpyObj<ToastrMessageWrapperService>;
  let mockLoggerService: jasmine.SpyObj<LoggerService>;

  beforeEach(async () => {
    mockToastrService = jasmine.createSpyObj('ToastrMessageWrapperService', [
      'displayMessage',
    ]);
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['info']);

    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent],
      providers: [
        { provide: ToastrMessageWrapperService, useValue: mockToastrService },
        { provide: LoggerService, useValue: mockLoggerService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isRemoveBtnEnable to true if isAdmin is in localStorage', () => {
    localStorage.setItem('isAdmin', 'true');
    const comp = new AdminDashboardComponent(
      mockToastrService,
      mockLoggerService
    );
    expect(comp.isRemoveBtnEnable).toBeTrue();
  });

  it('should set isRemoveBtnEnable to false if isAdmin is not in localStorage', () => {
    localStorage.removeItem('isAdmin');
    const comp = new AdminDashboardComponent(
      mockToastrService,
      mockLoggerService
    );
    expect(comp.isRemoveBtnEnable).toBeFalse();
  });

  it('should load widget visibility from localStorage on init', () => {
    localStorage.setItem(
      'widgetVisibility',
      JSON.stringify({
        showBarChartWidget: true,
        showTimeSeriesWidget: false,
      })
    );

    component.ngOnInit();

    expect(component.showBarChartWidget).toBeTrue();
    expect(component.showTimeSeriesWidget).toBeFalse();
  });

  it('should show bar chart widget when addWidget("Chart") is called', () => {
    component.addWidget('Chart');
    expect(component.showBarChartWidget).toBeTrue();
  });

  it('should show time series widget when addWidget("Time") is called', () => {
    component.addWidget('Time');
    expect(component.showTimeSeriesWidget).toBeTrue();
  });

  it('should hide bar chart widget when removeWidget("Chart") is called', () => {
    component.showBarChartWidget = true;
    component.removeWidget('Chart');
    expect(component.showBarChartWidget).toBeFalse();
  });

  it('should hide time series widget when removeWidget("Time") is called', () => {
    component.showTimeSeriesWidget = true;
    component.removeWidget('Time');
    expect(component.showTimeSeriesWidget).toBeFalse();
  });

  it('should save widget visibility to localStorage and show toast', () => {
    component.showBarChartWidget = true;
    component.showTimeSeriesWidget = true;

    component.saveLayout();

    const saved = JSON.parse(localStorage.getItem('widgetVisibility') || '{}');
    expect(saved).toEqual({
      showBarChartWidget: true,
      showTimeSeriesWidget: true,
    });

    expect(mockToastrService.displayMessage).toHaveBeenCalledWith(
      'Layout saved successfully!',
      ToastrMessageType.SUCCESS
    );
  });

  it('should remove widgetVisibility from localStorage and log on destroy', () => {
    localStorage.setItem('widgetVisibility', 'true');

    component.ngOnDestroy();

    expect(localStorage.getItem('widgetVisibility')).toBeNull();
    expect(mockLoggerService.info).toHaveBeenCalledWith(
      'Local storage variable widgetVisibility has been removed!'
    );
  });
});
