import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';
import { NGXLogger } from 'ngx-logger';

describe('LoggerService', () => {
  let service: LoggerService;
  let ngxLoggerSpy: jasmine.SpyObj<NGXLogger>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NGXLogger', [
      'trace',
      'debug',
      'info',
      'log',
      'warn',
      'error',
      'fatal',
    ]);

    TestBed.configureTestingModule({
      providers: [LoggerService, { provide: NGXLogger, useValue: spy }],
    });

    service = TestBed.inject(LoggerService);
    ngxLoggerSpy = TestBed.inject(NGXLogger) as jasmine.SpyObj<NGXLogger>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call trace on NGXLogger', () => {
    service.trace('trace message');
    expect(ngxLoggerSpy.trace).toHaveBeenCalledWith('trace message');
  });

  it('should call debug on NGXLogger', () => {
    service.debug('debug message');
    expect(ngxLoggerSpy.debug).toHaveBeenCalledWith('debug message');
  });

  it('should call info on NGXLogger', () => {
    service.info('info message');
    expect(ngxLoggerSpy.info).toHaveBeenCalledWith('info message');
  });

  it('should call log on NGXLogger', () => {
    service.log('log message');
    expect(ngxLoggerSpy.log).toHaveBeenCalledWith('log message');
  });

  it('should call warn on NGXLogger', () => {
    service.warn('warn message');
    expect(ngxLoggerSpy.warn).toHaveBeenCalledWith('warn message');
  });

  it('should call error on NGXLogger', () => {
    service.error('error message');
    expect(ngxLoggerSpy.error).toHaveBeenCalledWith('error message');
  });

  it('should call fatal on NGXLogger', () => {
    service.fatal('fatal message');
    expect(ngxLoggerSpy.fatal).toHaveBeenCalledWith('fatal message');
  });

  it('should forward additional parameters to NGXLogger methods', () => {
    const additional = ['extra1', { key: 'value' }];
    service.debug('debug with extras', ...additional);
    expect(ngxLoggerSpy.debug).toHaveBeenCalledWith(
      'debug with extras',
      ...additional
    );
  });
});
