import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ChartDataService } from '../../services/chartdata.service';
import {
  ToastrMessageWrapperService,
  ToastrMessageType,
} from '../../../shared/services/toastr-message-wrapper.service';
import { WidgetTypeEnum } from '../../models/enums';
import { LocalStorageKey } from '../../../core/models/enums';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrMessageWrapperService>;
  let chartServiceSpy: jasmine.SpyObj<ChartDataService>;

  beforeEach(async () => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrMessageWrapperService', [
      'displayMessage',
    ]);
    chartServiceSpy = jasmine.createSpyObj('ChartDataService', [
      'getOccupancyChartData',
      'getCheckInChartData',
      'getTimeSeriesChartData',
    ]);

    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent], // Standalone component import
      providers: [
        { provide: ChartDataService, useValue: chartServiceSpy },
        { provide: ToastrMessageWrapperService, useValue: toastrServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;

    chartServiceSpy.getOccupancyChartData.and.returnValue({
      data: 'occupancy',
    });
    chartServiceSpy.getCheckInChartData.and.returnValue({ data: 'checkin' });
    chartServiceSpy.getTimeSeriesChartData.and.returnValue({
      data: 'timeseries',
    });

    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable remove button if IsAdmin is set', () => {
    localStorage.setItem(LocalStorageKey.IsAdmin, 'true');
    const adminComponent = new AdminDashboardComponent(
      toastrServiceSpy,
      chartServiceSpy
    );
    expect(adminComponent.isRemoveBtnEnable).toBeTrue();
  });

  describe('addWidget', () => {
    it('should load occupancy data', () => {
      component.selectedWidgetType = WidgetTypeEnum.Occupancy;
      component.addWidget();
      expect(component.showOccupancyChartWidget).toBeTrue();
      expect(component.occupancyData).toEqual({ data: 'occupancy' });
      expect(toastrServiceSpy.displayMessage).toHaveBeenCalledWith(
        'Room Occupancy loaded successfully!',
        ToastrMessageType.SUCCESS
      );
    });

    it('should load check-in data', () => {
      component.selectedWidgetType = WidgetTypeEnum.CheckIn;
      component.addWidget();
      expect(component.showCheckInChartWidget).toBeTrue();
      expect(component.checkInData).toEqual({ data: 'checkin' });
    });

    it('should load daily chart data', () => {
      component.selectedWidgetType = WidgetTypeEnum.DailyCheckIn;
      component.addWidget();
      expect(component.showTimeSeriesWidget).toBeTrue();
      expect(component.dailyCheckInData).toEqual({ data: 'timeseries' });
    });
  });

  describe('removeWidget', () => {
    it('should hide occupancy chart', () => {
      component.showOccupancyChartWidget = true;
      component.removeWidget(WidgetTypeEnum.Occupancy);
      expect(component.showOccupancyChartWidget).toBeFalse();
    });

    it('should hide check-in chart', () => {
      component.showCheckInChartWidget = true;
      component.removeWidget(WidgetTypeEnum.CheckIn);
      expect(component.showCheckInChartWidget).toBeFalse();
    });

    it('should hide time series chart', () => {
      component.showTimeSeriesWidget = true;
      component.removeWidget(WidgetTypeEnum.DailyCheckIn);
      expect(component.showTimeSeriesWidget).toBeFalse();
    });
  });

  it('should change selected widget type on dropdown change', () => {
    component.onTypeDropdownChange(WidgetTypeEnum.CheckIn);
    expect(component.selectedWidgetType).toBe(WidgetTypeEnum.CheckIn);
  });

  it('should save layout and show success message', () => {
    component.showOccupancyChartWidget = true;
    component.showCheckInChartWidget = false;
    component.showTimeSeriesWidget = true;

    component.saveLayout();

    const saved = localStorage.getItem(LocalStorageKey.WidgetVisibility);
    expect(JSON.parse(saved!)).toEqual({
      showOccupancyChartWidget: true,
      showCheckInChartWidget: false,
      showTimeSeriesWidget: true,
    });

    expect(toastrServiceSpy.displayMessage).toHaveBeenCalledWith(
      'Layout saved successfully!',
      ToastrMessageType.SUCCESS
    );
  });

  describe('loadSavedDashboard', () => {
    it('should load and apply saved visibility', () => {
      localStorage.setItem(
        LocalStorageKey.WidgetVisibility,
        JSON.stringify({
          showOccupancyChartWidget: true,
          showCheckInChartWidget: true,
          showTimeSeriesWidget: false,
        })
      );

      component['loadSavedDashboard']();

      expect(component.showOccupancyChartWidget).toBeTrue();
      expect(component.showCheckInChartWidget).toBeTrue();
      expect(component.showTimeSeriesWidget).toBeFalse();
    });
  });
});
