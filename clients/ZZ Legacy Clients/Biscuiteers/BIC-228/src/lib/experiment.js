/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  logMessage(ID + " Variation: "+VARIATION)

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...


  let reminderHTML = `
  
    <ng-include id="${ID}-reminder" src="::'/catalog/product/product-reminder.html'" if-size="SM"><div class="flex flex-justify-end m-b-4-m m-b-4-s"><div class="w-8-x w-10-l w-12 m-t-7 m-t-0-s m-r m-r-0-m m-r-0-s bg-col-15 p-t-3 p-b-2 p-a-6-m flex"><div class="c-2-set c-1-set-m c-4-set-s p-l-1 p-r-1 m-r-0 m-b-0"><div class="ratio-1-1 rotate--20"><img class="rf loaded" image="/front/pressie-reminder.png" src="https://thumbor-gc.tomandco.uk/unsafe/228x228/filters:upscale():fill(white)/https://www.biscuiteers.com/images/pressie-reminder.png"></div></div><div class="flex-grow"><h2 class="col-11 fs-4 fs-5-s lh-2 m-b-1-s" ng-bind="::'Pressie reminder service' | ms">Pressie reminder service</h2><p class="fs-3 lh-3 lh-1-s col-12"><span ng-bind="::'Not ready to buy yet? Never forget a gift and' | ms">Not ready to buy yet? Never forget a gift and</span> <span class="col-11 cursor-pointer" click-event="reminder-modal.toggle.request" ng-bind="::'let us remind you' | ms">let us remind you</span></p></div></div></div></ng-include>
  
  `;

  let reminderModalHTML = `

    <reminder-modal id="${ID}-reminder-modal" class="pos-fixed z-11 top-0 left-0 bottom-0 right-0 ng-hide-animate hide-fade" product-id="vm.model.id">
    <!---->
    <div class="fill flex-x flex-l flex-m flex-grow-s flex-middle flex-justify-center overflow-y-scroll" ng-if="vm.isVisible">
        <div class="pos-relative p-a-6 bg-col-w" off-click="vm.hide()" off-click-if="vm.isVisible">
          <span class="pos-absolute top-2 fs-7 right-2 z-2 col-11 cursor-pointer" ng-click="vm.hide()"><i class="icon-cancel"></i></span>
          <reminder-form product-id="vm.productId">
              <!---->
              <div ng-if="!vm.isSent">
                <h2 class="fs-9 fs-8-s p-r col-11" ng-bind="::'create a reminder for personalised happy birthday medium tin chocolates' | ms">create a reminder for personalised happy birthday medium tin chocolates</h2>
                <p class="fs-3-s m-t-2 col-12 m-b-6" ng-bind="::'Not ready to buy? Too early? Not sure? Just pop your details here and we\'ll send you an email reminder in plenty of time' | ms">Not ready to buy? Too early? Not sure? Just pop your details here and we'll send you an email reminder in plenty of time</p>
                <form name="reminder_form" class="ng-pristine ng-invalid ng-invalid-required ng-valid-maxlength">
                    <input-wrap label="What date would you like an email reminder? (Remember to allow time for delivery?)" form="reminder_form" name="date" required="true">
                      <div class="pos-relative m-b is-required" ng-class="{'is-required': vm.required, 'is-disabled': vm.disabled}">
                          <label class="label" ng-bind-html="::vm.label || '&nbsp;'" ng-hide="::!vm.label" can-show="true">What date would you like an email reminder? (Remember to allow time for delivery?)</label>
                          <ng-transclude>
                            <datepicker-field required="true" model="vm.data.date" options="vm.calendarOptions" name="date">
                                <div off-click="vm.hide()" off-click-if="vm.isOpen" class="pos-relative">
                                  <div class="pos-relative"><input type="text" class="input ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" ng-attr-name="{{::vm.name}}" ng-value="vm.model | formatdate" ng-model="vm.model" ng-focus="vm.show()" ng-click="vm.show()" ng-model-options="::{updateOn: 'blur'}" ng-required="vm.required" name="date" required="required"> <span class="pos-absolute top-0 bottom-0 right-2 right-4-m right-4-s fs-7 flex flex-middle cursor-pointer" ng-click="vm.show()"><i class="icon-calendar"></i></span></div>
                                  <div>
                                      <div class="pos-absolute z-5 w-12">
                                        <div class="hide-up-container">
                                            <calendar class="ng-hide-animate ng-hide hide-up w-12 pos-relative p-a-2 b-a bg-col-w" on-change="vm.hide" ng-show="vm.isOpen" options="vm.options" model="vm.model">
                                              <div class="flex p-t p-b center font-default col-12">
                                                  <div class="w-2">
                                                    <action class="p-a-2 fs-9 bg-col-5 b-radius-5 cursor-pointer no-wrap" ng-click="vm.prevMonth()" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><i class="icon-left-open"></i></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <div class="w-10">
                                                    <p class="uppercase fs-4 fw-bold" ng-bind="vm.monthDate | date:'MMMM'">June</p>
                                                    <p ng-bind="vm.monthDate | date:'yyyy'">2021</p>
                                                  </div>
                                                  <div class="w-2">
                                                    <action class="p-a-2 fs-8 bg-col-5 b-radius-5 cursor-pointer no-wrap" ng-click="vm.nextMonth()" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><i class="icon-right-open"></i></ng-transclude>
                                                    </action>
                                                  </div>
                                              </div>
                                              <div class="flex no-wrap font-default center">
                                                  <!---->
                                                  <div class="flex-span-1 p-t-2 p-b-2 uppercase fs-2 col-12 week" ng-repeat="day in ::vm.weekDays track by $index" ng-bind=":: day | date:'EEE'">Sun</div>
                                                  <!---->
                                                  <div class="flex-span-1 p-t-2 p-b-2 uppercase fs-2 col-12 week" ng-repeat="day in ::vm.weekDays track by $index" ng-bind=":: day | date:'EEE'">Mon</div>
                                                  <!---->
                                                  <div class="flex-span-1 p-t-2 p-b-2 uppercase fs-2 col-12 week" ng-repeat="day in ::vm.weekDays track by $index" ng-bind=":: day | date:'EEE'">Tue</div>
                                                  <!---->
                                                  <div class="flex-span-1 p-t-2 p-b-2 uppercase fs-2 col-12 week" ng-repeat="day in ::vm.weekDays track by $index" ng-bind=":: day | date:'EEE'">Wed</div>
                                                  <!---->
                                                  <div class="flex-span-1 p-t-2 p-b-2 uppercase fs-2 col-12 week" ng-repeat="day in ::vm.weekDays track by $index" ng-bind=":: day | date:'EEE'">Thu</div>
                                                  <!---->
                                                  <div class="flex-span-1 p-t-2 p-b-2 uppercase fs-2 col-12 week" ng-repeat="day in ::vm.weekDays track by $index" ng-bind=":: day | date:'EEE'">Fri</div>
                                                  <!---->
                                                  <div class="flex-span-1 p-t-2 p-b-2 uppercase fs-2 col-12 week" ng-repeat="day in ::vm.weekDays track by $index" ng-bind=":: day | date:'EEE'">Sat</div>
                                                  <!---->
                                              </div>
                                              <!---->
                                              <div class="flex no-wrap font-default center" ng-repeat="week in vm.weeks">
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled b-a-0 bg-col-t col-w" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'"></span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled b-a-0 bg-col-t col-w" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'"></span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">1</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">2</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">3</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">4</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">5</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                              </div>
                                              <!---->
                                              <div class="flex no-wrap font-default center" ng-repeat="week in vm.weeks">
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">6</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">7</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">8</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">9</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">10</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">11</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">12</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                              </div>
                                              <!---->
                                              <div class="flex no-wrap font-default center" ng-repeat="week in vm.weeks">
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">13</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">14</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">15</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">16</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">17</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">18</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">19</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                              </div>
                                              <!---->
                                              <div class="flex no-wrap font-default center" ng-repeat="week in vm.weeks">
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">20</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">21</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">22</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">23</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-day" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default fw-bold fw-normal-s" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">24</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-day" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default fw-bold fw-normal-s" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">25</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-day" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default fw-bold fw-normal-s" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">26</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                              </div>
                                              <!---->
                                              <div class="flex no-wrap font-default center" ng-repeat="week in vm.weeks">
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-day" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default fw-bold fw-normal-s" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">27</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-day" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default fw-bold fw-normal-s" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">28</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-day" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default fw-bold fw-normal-s" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">29</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-day" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default fw-bold fw-normal-s" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'">30</span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled b-a-0 bg-col-t col-w" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'"></span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled b-a-0 bg-col-t col-w" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'"></span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                                  <div class="flex-span-1 p-a-1 day" ng-repeat="day in ::week track by $index">
                                                    <action class="w-12 p-r-0 p-l-0 button-shadow is-disabled b-a-0 bg-col-t col-w" ng-class="{ 'is-active': day.isPicked, 'is-disabled': day.isDisabled || !day, 'b-a-0 bg-col-t col-w': !day, 'is-day': day &amp;&amp; !day.isDisabled }" ng-click="vm.pick(day)" role="button" tabindex="0">
                                                        <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                                                        <ng-transclude class="c-body"><span class="font-default" ng-class="{'fw-bold fw-normal-s': day &amp;&amp; !day.isDisabled}" ng-bind="::day | date:'d'"></span></ng-transclude>
                                                    </action>
                                                  </div>
                                                  <!---->
                                              </div>
                                              <!---->
                                            </calendar>
                                        </div>
                                      </div>
                                  </div>
                                </div>
                            </datepicker-field>
                          </ng-transclude>
                          <!---->
                          <field-notice field="date" form="::vm.form" parent-error-class="is-invalid" can-show="vm.canShow" custom-error-messages="::vm.custom.customErrorMessages" ng-if="::vm.name" class="ng-hide"></field-notice>
                          <!---->
                      </div>
                    </input-wrap>
                    <input-wrap label="What's your name" form="reminder_form" name="sender_name" required="true">
                      <div class="pos-relative m-b is-required" ng-class="{'is-required': vm.required, 'is-disabled': vm.disabled}">
                          <label class="label" ng-bind-html="::vm.label || '&nbsp;'" ng-hide="::!vm.label" can-show="true">What's your name</label>
                          <ng-transclude><input class="input ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" type="text" name="sender_name" ng-model="vm.data.sender_name" required=""></ng-transclude>
                          <!---->
                          <field-notice field="sender_name" form="::vm.form" parent-error-class="is-invalid" can-show="vm.canShow" custom-error-messages="::vm.custom.customErrorMessages" ng-if="::vm.name" class="ng-hide"></field-notice>
                          <!---->
                      </div>
                    </input-wrap>
                    <input-wrap label="What's your email" form="reminder_form" name="sender_email" required="true">
                      <div class="pos-relative m-b is-required" ng-class="{'is-required': vm.required, 'is-disabled': vm.disabled}">
                          <label class="label" ng-bind-html="::vm.label || '&nbsp;'" ng-hide="::!vm.label" can-show="true">What's your email</label>
                          <ng-transclude><input class="input ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" type="text" name="sender_email" ng-model="vm.data.sender_email" required=""></ng-transclude>
                          <!---->
                          <field-notice field="sender_email" form="::vm.form" parent-error-class="is-invalid" can-show="vm.canShow" custom-error-messages="::vm.custom.customErrorMessages" ng-if="::vm.name" class="ng-hide"></field-notice>
                          <!---->
                      </div>
                    </input-wrap>
                    <input-wrap label="Any message to go in your reminder?" required="true" name="sender_message" form="reminder_form">
                      <div class="pos-relative m-b is-required" ng-class="{'is-required': vm.required, 'is-disabled': vm.disabled}">
                          <label class="label" ng-bind-html="::vm.label || '&nbsp;'" ng-hide="::!vm.label" can-show="true">Any message to go in your reminder?</label>
                          <ng-transclude><textarea class="textarea ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-maxlength" name="sender_message" ng-required="true" ng-model="vm.data.sender_message" maxlength="200" rows="4" required="required"></textarea></ng-transclude>
                          <!---->
                          <field-notice field="sender_message" form="::vm.form" parent-error-class="is-invalid" can-show="vm.canShow" custom-error-messages="::vm.custom.customErrorMessages" ng-if="::vm.name" class="ng-hide"></field-notice>
                          <!---->
                      </div>
                    </input-wrap>
                    <action class="m-t-2 button" status="::vm.status" ng-click="vm.submit(reminder_form)" role="button" tabindex="0">
                      <span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
                      <ng-transclude class="c-body">
                          <t ng-bind="::'save reminder' | ms">save reminder</t>
                      </ng-transclude>
                    </action>
                    <result status="::vm.status" class="ng-hide"></result>
                </form>
              </div>
              <!----><!---->
          </reminder-form>
        </div>
    </div>
    <!---->
  </reminder-modal>
  
  `;

  pollerLite(['div[ng-if="vm.isGiftMessageVisible"]'], () => {

    let insertionPoint = document.querySelector('div[ng-if="vm.isGiftMessageVisible"]');

    insertionPoint.insertAdjacentHTML('beforebegin', reminderHTML);
    insertionPoint.insertAdjacentHTML('beforebegin', reminderModalHTML);

    tco.get('app')
          .$compile(
            angular.element(document.getElementById(`${ID}-reminder`))
          )(
            angular.element(document.querySelector('checkout-view')).data()['$checkoutViewController'].$scope
          );


    tco.get('app')
          .$compile(
            angular.element(document.getElementById(`${ID}-reminder-modal`))
          )(
            angular.element(document.querySelector('checkout-view')).data()['$checkoutViewController'].$scope
          );

  });

  

};
