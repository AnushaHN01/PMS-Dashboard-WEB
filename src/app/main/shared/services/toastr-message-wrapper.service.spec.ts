import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import {
  ToastrMessageWrapperService,
  ToastrMessageType,
} from './toastr-message-wrapper.service';

describe('ToastrMessageWrapperService', () => {
  let service: ToastrMessageWrapperService;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
      'warning',
      'info',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ToastrMessageWrapperService,
        { provide: ToastrService, useValue: spy },
      ],
    });

    service = TestBed.inject(ToastrMessageWrapperService);
    toastrServiceSpy = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call toastr.success for SUCCESS type', () => {
    service.displayMessage('Success Message', ToastrMessageType.SUCCESS);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(
      'Success Message',
      '',
      jasmine.any(Object)
    );
  });

  it('should call toastr.error for ERROR type', () => {
    service.displayMessage('Error Message', ToastrMessageType.ERROR);
    expect(toastrServiceSpy.error).toHaveBeenCalledWith(
      'Error Message',
      '',
      jasmine.any(Object)
    );
  });

  it('should call toastr.warning for WARNING type', () => {
    service.displayMessage('Warning Message', ToastrMessageType.WARNING);
    expect(toastrServiceSpy.warning).toHaveBeenCalledWith(
      'Warning Message',
      '',
      jasmine.any(Object)
    );
  });

  it('should call toastr.info for INFO type', () => {
    service.displayMessage('Info Message', ToastrMessageType.INFO);
    expect(toastrServiceSpy.info).toHaveBeenCalledWith(
      'Info Message',
      '',
      jasmine.any(Object)
    );
  });
});
