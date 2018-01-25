import { Meteor } from 'meteor/meteor';
import { FriendsCollection } from 'meteor/socialize:friendships';
import { CommentsCollection } from 'meteor/socialize:commentable';
import { PostsCollection } from 'meteor/socialize:postable';

const optionsArgumentCheck = {
  limit: Match.Optional(Number),
  skip: Match.Optional(Number),
  sort: Match.Optional(Object),
};

/**
 * Feed for the current user
 * @function publication feed
 * @param {object} options
 * @returns {pointer}
 */
Meteor.publish('feed', function (options) {
  let friendMap;

  if (!this.userId) {
    return this.ready();
  }

  friendMap = FriendsCollection.find({userId: this.userId}, {fields: {friendId: true}}).map(function (friend) {
    return friend.friendId;
  });

  friendMap.push(this.userId);

  options = options || {};

  check(options, optionsArgumentCheck);

  Meteor.publishWithRelations({
    handle: this,
    collection: PostsCollection,
    filter: {$or: [ {userId: {$in: friendMap}}, {posterId: {$in: friendMap}} ]},
    options,
    mappings: [ {
      key: 'userId',
      collection: Meteor.users,
      options: {fields: {username: true}}
    }, {
      reverse: true,
      key: 'linkedObjectId',
      collection: CommentsCollection,
      options: {sort: {date: -1}, limit: 3},
      mappings: [ {
        key: 'userId',
        collection: Meteor.users,
        options: {fields: {username: true}}
      } ]
    } ]
  });
});

/**
 * Post for a particular user
 * @function publication posts
 * @param {string} userId
 * @param {object} options
 * @returns {pointer}
 */
Meteor.publish('posts', function (userId, options) {
  check(userId, String);


  let friendMap;

  if (!userId) {
    return this.ready();
  }

  friendMap = FriendsCollection.find({posterId: userId}, {fields: {friendId: true}}).map(function (friend) {
    return friend.friendId;
  });

  friendMap.push(userId);

  options = options || {};

  check(options, optionsArgumentCheck);

  Meteor.publishWithRelations({
    handle: this,
    collection: PostsCollection,
    filter: {$or: [ {userId}, {posterId: userId} ]},
    options,
    mappings: [ {
      key: 'userId',
      collection: Meteor.users,
      options: {fields: {username: true}}
    }, {
      reverse: true,
      key: 'linkedObjectId',
      collection: CommentsCollection,
      options: {sort: {date: -1}, limit: 3},
      mappings: [ {
        key: 'userId',
        collection: Meteor.users,
        options: {fields: {username: true}}
      } ]
    } ]
  });
});
