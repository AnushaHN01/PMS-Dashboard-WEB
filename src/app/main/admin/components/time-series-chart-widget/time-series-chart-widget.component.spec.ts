import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeSeriesChartWidgetComponent } from './time-series-chart-widget.component';
import { ChartDataService } from '../../services/chartdata.service';
import {
  ToastrMessageWrapperService,
  ToastrMessageType,
} from '../../../shared/services/toastr-message-wrapper.service';
import { ChartType } from '../../../shared/models/enums';

describe('TimeSeriesChartWidgetComponent', () => {
  let component: TimeSeriesChartWidgetComponent;
  let fixture: ComponentFixture<TimeSeriesChartWidgetComponent>;
  let chartDataServiceSpy: jasmine.SpyObj<ChartDataService>;
  let toastrSpy: jasmine.SpyObj<ToastrMessageWrapperService>;

  beforeEach(async () => {
    chartDataServiceSpy = jasmine.createSpyObj('ChartDataService', [
      'getTimeSeriesChartData',
    ]);
    toastrSpy = jasmine.createSpyObj('ToastrMessageWrapperService', [
      'displayMessage',
    ]);

    await TestBed.configureTestingModule({
      imports: [TimeSeriesChartWidgetComponent],
      providers: [
        { provide: ChartDataService, useValue: chartDataServiceSpy },
        { provide: ToastrMessageWrapperService, useValue: toastrSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeSeriesChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set chartType to Line and call loadTimeSeries on init', () => {
    const mockData = [{ x: '2024-01-01', y: 100 }];
    chartDataServiceSpy.getTimeSeriesChartData.and.returnValue(mockData);

    component.ngOnInit();

    expect(component.chartType).toBe(ChartType.Line);
    expect(chartDataServiceSpy.getTimeSeriesChartData).toHaveBeenCalled();
    expect(component.chartData).toEqual(mockData);
    expect(toastrSpy.displayMessage).toHaveBeenCalledWith(
      'Time series loaded successfully!',
      ToastrMessageType.SUCCESS
    );
  });

  it('should emit showTimeWidget false, clear chartData and show toast on removeWidget()', () => {
    const emitSpy = spyOn(component.showTimeWidget, 'emit');

    component.chartData = [{ x: 'value', y: 10 }];
    component.removeWidget();

    expect(emitSpy).toHaveBeenCalledWith(false);
    expect(component.chartData).toBeNull();
    expect(toastrSpy.displayMessage).toHaveBeenCalledWith(
      'Widget Removed successfully!',
      ToastrMessageType.SUCCESS
    );
  });

  it('should return correct chartOptions for Line chart', () => {
    component.chartType = ChartType.Line;
    const options = component.chartOptions;

    expect(options.scales.x.type).toBe('time');
    expect(options.plugins.title.text).toBe('Chart Widget');
  });

  it('should return correct chartOptions for Bar chart', () => {
    component.chartType = ChartType.Bar;
    const options = component.chartOptions;

    expect(options.scales.x.type).toBe('category');
    expect(options.scales.y.beginAtZero).toBeTrue();
  });
});
