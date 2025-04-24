import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import settings from './lib/settings';

const { ID } = settings;

pollerLite([
  '#couponcode',
  '.code form .Button',
  () => !!window?.AppModule?.RootScope?.$on,
  () => !!window?.AppModule?.RootScope?.Layout?.Name,
  () => window?.AppModule?.RootScope?.Session?.IsCustomerRegistered !== undefined,
  () => window?.AppModule?.RootScope?.Session?.HasRepresentative !== undefined,
  () => window?.AppModule?.RootScope?.Session?.Customer?.EmailAddress !== undefined,
], () => {
  const rootScope = window.AppModule.RootScope;
  const isLoggedIn = rootScope.Session.IsCustomerRegistered;
  const isAttachedToRep = rootScope.Session.HasRepresentative;
  const isStaff = (() => {
    const email = rootScope.Session.Customer.EmailAddress;
    return typeof email === 'string' ? email.toLowerCase().indexOf('@avon.com') > -1 : false;
  })();

  if (isLoggedIn && isAttachedToRep && isStaff) {
    events.send(`${ID}-variation`, 'did-meet-conditions');
    activate();
  }
});
