import templateUrl from './loader.html';
import ngModule from '../module';

import 'velocity-animate';
import 'velocity-animate/velocity.ui';

ngModule.controller('AvLoaderController', function($element) {

  const self = this;
  let active;

  this.start = function() {
    active = true;
    this.animate();
  };

  this.animate = function() {

    $element
      .find('.loading-bullet')
      .velocity('transition.slideRightIn', { stagger: 250 })
      .velocity({ opacity: 0 }, {
        delay: 750,
        duration: 500,
        complete() {
          if (active) {
            setTimeout(function() {self.animate() }, 500);
          } else {
            self.endAnimation();
          }
        }
      });

  };

  this.endAnimation = function() {
    $element.find('.loading-bullet').velocity('stop', true);
    $element.removeData();
  };

  this.stop = function() {
    active = false;
  };

});

ngModule.directive('avLoader', function() {
  return {
    restrict: 'AE',
    replace: true,
    controller: 'AvLoaderController',
    require: 'avLoader',
    templateUrl,
    link(scope, element, attr, avLoader) {

      if (!attr.delay) {
        avLoader.start();
      }

      scope.$on('$destroy', function() {
        avLoader.stop();
      });

    }
  };
});


