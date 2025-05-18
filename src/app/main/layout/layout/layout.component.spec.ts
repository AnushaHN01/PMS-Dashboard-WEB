import { TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { DashboardService } from '../../admin/services/dashboard.service';
import { of } from 'rxjs';

import { ToastrModule } from 'ngx-toastr';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

class MockDashboardService {
  getMetrics() {
    return of([]);
  }
}

describe('LayoutComponent', () => {
  let component: LayoutComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutComponent,
        ToastrModule.forRoot(), // <-- Add this
        LoggerModule.forRoot({
          // <-- And this
          level: NgxLoggerLevel.DEBUG,
          serverLogLevel: NgxLoggerLevel.ERROR,
        }),
      ],
      providers: [
        { provide: DashboardService, useClass: MockDashboardService },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize adminSections from AdminSection enum', () => {
    expect(component.adminSections.length).toBeGreaterThan(0);
  });

  it('should populate metrics on ngOnInit', () => {
    component.ngOnInit();
    expect(component.metrics).toEqual([]);
  });
});
