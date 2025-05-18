import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericChartWidgetComponent } from './generic-chart-widget.component';
import {
  ToastrMessageType,
  ToastrMessageWrapperService,
} from '../../services/toastr-message-wrapper.service';
import { ChartType } from '../../models/enums';
import { LocalStorageKey } from '../../../core/models/enums';

// Mock Toastr service
class MockToastrService {
  displayMessage(msg: string, type: ToastrMessageType) {}
}

describe('GenericChartWidgetComponent', () => {
  let component: GenericChartWidgetComponent;
  let fixture: ComponentFixture<GenericChartWidgetComponent>;
  let toastrService: ToastrMessageWrapperService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericChartWidgetComponent], // Standalone component, import it
      providers: [
        { provide: ToastrMessageWrapperService, useClass: MockToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericChartWidgetComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrMessageWrapperService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default chartType as Bar', () => {
    expect(component.chartType).toBe(ChartType.Bar);
  });

  it('should set isRemoveBtnEnable true if IsAdmin is set in localStorage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === LocalStorageKey.IsAdmin) return 'true';
      return null;
    });

    // Recreate component to trigger constructor again
    const comp = new GenericChartWidgetComponent(toastrService);
    expect(comp.isRemoveBtnEnable).toBeTrue();
  });

  it('should emit remove event and clear chartData on removeWidget call', () => {
    spyOn(component.remove, 'emit');
    spyOn(toastrService, 'displayMessage');

    component.chartData = { some: 'data' };
    component.removeWidget();

    expect(component.remove.emit).toHaveBeenCalled();
    expect(component.chartData).toBeNull();
    expect(toastrService.displayMessage).toHaveBeenCalledWith(
      'Widget removed successfully!',
      ToastrMessageType.SUCCESS
    );
  });

  it('should generate correct chartOptions for Bar chartType', () => {
    component.chartType = ChartType.Bar;
    component.widgetTitle = 'Test Chart';

    const options = component.chartOptions;
    expect(options.plugins.title.text).toBe('Test Chart');
    expect(options.scales.x.type).toBe('category');
  });

  it('should generate correct chartOptions for Line chartType', () => {
    component.chartType = ChartType.Line;

    const options = component.chartOptions;
    expect(options.scales.x.type).toBe('time');
  });
});
