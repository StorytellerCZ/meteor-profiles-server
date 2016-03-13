Package.describe({
  name: 'storyteller:profiles-server',
  version: '0.3.2',
  summary: 'Server side for the storyteller:profiles-react-materialize package',
  git: 'https://github.com/StorytellerCZ/meteor-profiles-server.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript', 'meteor', 'check', 'accounts-password']);
  api.use([
    'tmeasday:publish-with-relations@0.2.0' // TODO change for lepozepo:publish-with-relations
    'aldeed:collection2@2.9.0',
    'socialize:user-profile@0.2.0',
    'socialize:friendships@0.4.2',
    'socialize:feed@0.2.2'
  ])

  api.addFiles(['profiles.js'])
  api.addFiles([
    'user.js',
    'friendship.js',
    'feed.js'
  ], "server")

  api.imply([
    'socialize:base-model@0.4.0',
    'socialize:user-model@0.1.6',
    'socialize:user-profile',
    'socialize:friendships',
    'socialize:commentable@0.2.1',
    'socialize:likeable@0.2.1',
    'socialize:feed'
  ])
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('storyteller:profiles-server');
});
