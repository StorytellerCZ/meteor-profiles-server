/**
 * Feed for the current user
 * @function publication feed
 * @param {object} options
 * @returns {pointer}
 */
Meteor.publish('feed', function(options) {
  let friendMap

  if(!this.userId){
    return this.ready()
  }

  friendMap = Meteor.friends.find({userId:this.userId}, {fields:{friendId:true}}).map(function(friend){
    return friend.friendId;
  })

  friendMap.push(this.userId)

  options = options || {}

  //only allow the limit and skip options
  options = _.pick(options, "limit", "skip", "sort");

  Meteor.publishWithRelations({
    handle: this,
    collection: Meteor.posts,
    filter: {$or:[{userId:{$in:friendMap}}, {posterId:{$in:friendMap}}]},
    options:options,
    mappings: [{
      key: 'userId',
      collection: Meteor.users,
      options:{fields:{username:true}}
    }, {
      reverse: true,
      key: 'linkedObjectId',
      collection: Meteor.comments,
      options:{sort:{date:-1}, limit:3},
      mappings: [{
        key: 'userId',
        collection: Meteor.users,
        options:{fields:{username:true}}
      }]
    }]
  })
})

/**
 * Post for a particular user
 * @function publication posts
 * @param {string} userId
 * @param {object} options
 * @returns {pointer}
 */
Meteor.publish('posts', function(userId, options) {
  let friendMap

  if(!userId){
    return this.ready()
  }

  friendMap = Meteor.friends.find({posterId: userId}, {fields:{friendId:true}}).map(function(friend){
    return friend.friendId;
  })

  friendMap.push(userId)

  options = options || {}

  //only allow the limit and skip options
  options = _.pick(options, "limit", "skip", "sort");

  Meteor.publishWithRelations({
    handle: this,
    collection: Meteor.posts,
    filter: {$or:[{userId: userId}, {posterId: userId}]},
    options:options,
    mappings: [{
      key: 'userId',
      collection: Meteor.users,
      options:{fields:{username:true}}
    }, {
      reverse: true,
      key: 'linkedObjectId',
      collection: Meteor.comments,
      options:{sort:{date:-1}, limit:3},
      mappings: [{
        key: 'userId',
        collection: Meteor.users,
        options:{fields:{username:true}}
      }]
    }]
  })
})