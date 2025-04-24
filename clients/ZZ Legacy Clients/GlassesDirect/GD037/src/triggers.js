import activate from './lib/experiment';

if (!window.universal_variable.user.has_transacted) {
  activate();
}
