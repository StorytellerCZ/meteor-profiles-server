Package.describe({
  name: 'storyteller:profiles-server',
  version: '1.0.0',
  summary: 'Server side for the storyteller:profiles-react-materialize package',
  git: 'https://github.com/StorytellerCZ/meteor-profiles-server.git',
  documentation: 'README.md',
  deprecated: true
});

Package.onUse(function(api) {
  api.versionsFrom(['1.4', '2.3']);
  api.use(['ecmascript', 'meteor', 'check', 'accounts-password']);
  api.use([
    'reywood:publish-composite@1.7.3',
    'aldeed:collection2@3.5.0',
    'socialize:user-profile@1.0.5',
    'socialize:friendships@1.1.2',
    'socialize:postable@1.0.2',
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
    'socialize:base-model@1.1.7',
    'socialize:user-model@1.0.5',
    'socialize:user-profile@1.0.5',
    'socialize:friendships@1.1.2', // TODO friending and blocking
    'socialize:commentable@1.0.5',
    'socialize:likeable@1.0.5',
    'socialize:postable@1.0.2',
  ])
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('storyteller:profiles-server');
});
