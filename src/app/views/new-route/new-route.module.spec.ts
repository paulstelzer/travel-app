import { NewRouteModule } from './new-route.module';

describe('NewRouteModule', () => {
  let newRouteModule: NewRouteModule;

  beforeEach(() => {
    newRouteModule = new NewRouteModule();
  });

  it('should create an instance', () => {
    expect(newRouteModule).toBeTruthy();
  });
});
