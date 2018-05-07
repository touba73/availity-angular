import demo from 'demo';

import './service';

import photos1 from './fixtures/photos-1.json';
import photos2 from './fixtures/photos-2.json';
import organizations1 from './fixtures/organizations-1.json';
import organizations2 from './fixtures/organizations-2.json';
import user from './fixtures/user.json';

demo.controller('DemoDropdownController', ($scope, demoDropdownService) => {
  $scope.vm = demoDropdownService;
});


demo.run($httpBackend => {

  $httpBackend
    .whenRoute('GET', /\/api\/v1\/photos\?offset=.*&q=a.*/)
    .respond(photos1);

  $httpBackend
    .whenRoute('GET', /\/api\/v1\/photos\?offset=.*&q=.*/)
    .respond(photos2);

  $httpBackend
    .whenRoute('GET', /\/api\/sdk\/platform\/v1\/users\/me.*/)
    .respond(user);

  $httpBackend
    .whenRoute('GET', /\/api\/sdk\/platform\/v1\/organizations\?offset=0.*/)
    .respond(organizations1);

  $httpBackend
    .whenRoute('GET', /\/api\/sdk\/platform\/v1\/organizations\?offset=50.*/)
    .respond(organizations2);

});
