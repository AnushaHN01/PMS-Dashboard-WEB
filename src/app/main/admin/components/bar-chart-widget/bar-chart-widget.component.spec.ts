import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarChartWidgetComponent } from './bar-chart-widget.component';
import { ChartDataService } from '../../services/chartdata.service';
import {
  ToastrMessageWrapperService,
  ToastrMessageType,
} from '../../../shared/services/toastr-message-wrapper.service';
import { ChartType } from '../../../shared/models/enums';
import { RoomTypeKPI } from '../../models/enums';

describe('BarChartWidgetComponent', () => {
  let component: BarChartWidgetComponent;
  let fixture: ComponentFixture<BarChartWidgetComponent>;
  let chartDataServiceSpy: jasmine.SpyObj<ChartDataService>;
  let toastrSpy: jasmine.SpyObj<ToastrMessageWrapperService>;

  beforeEach(async () => {
    chartDataServiceSpy = jasmine.createSpyObj('ChartDataService', [
      'getOccupancyChartData',
      'getCheckInChartData',
    ]);
    toastrSpy = jasmine.createSpyObj('ToastrMessageWrapperService', [
      'displayMessage',
    ]);

    await TestBed.configureTestingModule({
      imports: [BarChartWidgetComponent],
      providers: [
        { provide: ChartDataService, useValue: chartDataServiceSpy },
        { provide: ToastrMessageWrapperService, useValue: toastrSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize chartType to Bar and load occupancy chart', () => {
    const mockData = [{ label: 'Suite', value: 30 }];
    chartDataServiceSpy.getOccupancyChartData.and.returnValue(mockData);

    component.ngOnInit();

    expect(component.chartType).toBe(ChartType.Bar);
    expect(chartDataServiceSpy.getOccupancyChartData).toHaveBeenCalled();
    expect(component.chartData).toEqual(mockData);
    expect(toastrSpy.displayMessage).toHaveBeenCalledWith(
      'Room types by occupancy loaded successfully!',
      ToastrMessageType.SUCCESS
    );
  });

  it('should emit false, clear chartData and show toast on removeWidget()', () => {
    const emitSpy = spyOn(component.showChartWidget, 'emit');
    component.chartData = [{ some: 'data' }];

    component.removeWidget();

    expect(emitSpy).toHaveBeenCalledWith(false);
    expect(component.chartData).toBeNull();
    expect(toastrSpy.displayMessage).toHaveBeenCalledWith(
      'Widget Removed successfully!',
      ToastrMessageType.SUCCESS
    );
  });

  it('should load occupancy chart when onTypeDropdownChange is called with "Occupancy"', () => {
    const mockData = [{ label: 'Deluxe', value: 40 }];
    chartDataServiceSpy.getOccupancyChartData.and.returnValue(mockData);

    component.onTypeDropdownChange('Occupancy');

    expect(chartDataServiceSpy.getOccupancyChartData).toHaveBeenCalled();
    expect(component.chartData).toEqual(mockData);
    expect(toastrSpy.displayMessage).toHaveBeenCalledWith(
      'Room types by occupancy loaded successfully!',
      ToastrMessageType.SUCCESS
    );
  });

  it('should load check-in chart when onTypeDropdownChange is called with "Check-in"', () => {
    const mockData = [{ label: 'Monday', value: 20 }];
    chartDataServiceSpy.getCheckInChartData.and.returnValue(mockData);

    component.onTypeDropdownChange('Check-in');

    expect(chartDataServiceSpy.getCheckInChartData).toHaveBeenCalled();
    expect(component.chartData).toEqual(mockData);
    expect(toastrSpy.displayMessage).toHaveBeenCalledWith(
      'Check-in count by weekday loaded successfully!',
      ToastrMessageType.SUCCESS
    );
  });

  it('should compute chartOptions correctly for Bar chart', () => {
    component.chartType = ChartType.Bar;
    const options = component.chartOptions;

    expect(options.scales.x.type).toBe('category');
    expect(options.plugins.title.text).toBe('Chart Widget');
  });

  it('should populate roomTypes correctly from RoomTypeKPI enum', () => {
    const expectedLabels = Object.values(RoomTypeKPI);
    const actualLabels = component.roomTypes.map((r) => r.label);

    expect(actualLabels).toEqual(expectedLabels);
  });
});
