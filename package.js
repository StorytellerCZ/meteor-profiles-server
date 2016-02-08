Package.describe({
  name: 'storyteller:profiles-server',
  version: '0.1.1',
  summary: 'Server side for the storyteller:profiles-react-materialize package',
  git: 'https://github.com/StorytellerCZ/meteor-profiles-server.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript', 'meteor', 'check', 'accounts-password']);
  api.use(['aldeed:collection2@2.8.0', 'socialize:user-profile@0.1.5'])

  api.addFiles(['profiles.js'])

  api.imply(['socialize:base-model@0.3.1', 'socialize:user-model@0.1.5', 'socialize:user-profile'])
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('storyteller:profiles-server');
});
