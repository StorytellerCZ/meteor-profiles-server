Package.describe({
  name: 'storyteller:profiles-server',
  version: '1.0.0-alpha.1',
  summary: 'Server side for the storyteller:profiles-react-materialize package',
  git: 'https://github.com/StorytellerCZ/meteor-profiles-server.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use(['ecmascript', 'meteor', 'check', 'accounts-password']);
  api.use([
    'reywood:publish-composite@1.5.2',
    'aldeed:collection2@2.10.0',
    'socialize:user-profile@1.0.0',
    'socialize:friendships@1.0.0',
    'socialize:postable@1.0.0',
  ]);

  api.addFiles([
    'profiles.js',
    'profiles_schema.js'
  ]);
  api.addFiles([
    'user.js',
    'friendship.js',
    'feed.js'
  ], "server");

  api.imply([
    'socialize:base-model@1.1.0',
    'socialize:user-model@1.0.0',
    'socialize:user-profile@1.0.0',
    'socialize:friendships@1.0.0', // TODO friending and blocking
    'socialize:commentable@1.0.0',
    'socialize:likeable@1.0.0',
    'socialize:postable@1.0.0',
  ])
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('storyteller:profiles-server');
});
