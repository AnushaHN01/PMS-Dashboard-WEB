import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardModel } from '../../models/dashboard';
import { AdminSection } from '../../models/enums';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let mockDashboardService: jasmine.SpyObj<DashboardService>;

  const mockMetrics: DashboardModel[] = [
    { title: 'Occupancy', value: 92 },
    { title: 'Revenue', value: 120000 },
  ];

  beforeEach(async () => {
    mockDashboardService = jasmine.createSpyObj('DashboardService', [
      'getMetrics',
    ]);
    mockDashboardService.getMetrics.and.returnValue(of(mockMetrics));

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'isAdmin' ? 'true' : null;
    });

    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent],
      providers: [
        { provide: DashboardService, useValue: mockDashboardService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isRemoveBtnEnable to true if isAdmin is in localStorage', () => {
    expect(component.isRemoveBtnEnable).toBeTrue();
  });

  it('should call getMetrics and populate metrics on init', () => {
    expect(mockDashboardService.getMetrics).toHaveBeenCalled();
    expect(component.metrics).toEqual(mockMetrics);
  });

  it('should show bar chart widget when addWidget is called with "Chart"', () => {
    component.addWidget('Chart');
    expect(component.showBarChartWidget).toBeTrue();
  });

  it('should show time series widget when addWidget is called with "Time"', () => {
    component.addWidget('Time');
    expect(component.showTimeSeriesWidget).toBeTrue();
  });

  it('should hide bar chart widget when removeWidget is called with "Chart"', () => {
    component.showBarChartWidget = true;
    component.removeWidget('Chart');
    expect(component.showBarChartWidget).toBeFalse();
  });

  it('should hide time series widget when removeWidget is called with "Time"', () => {
    component.showTimeSeriesWidget = true;
    component.removeWidget('Time');
    expect(component.showTimeSeriesWidget).toBeFalse();
  });

  it('should populate adminSections from AdminSection enum', () => {
    expect(component.adminSections).toEqual(Object.values(AdminSection));
  });
});
