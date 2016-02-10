/**
 * As per the official documentation at: https://github.com/copleykj/socialize-friendships/wiki/Publications
 */
//Setup a schema so we can check the arguments to ensure application security
var publicationOptionsSchema = new SimpleSchema({
  limit:{
    type:Number,
    optional:true
  },
  skip:{
    type:Number,
    optional:true
  },
  sort:{
    type:Number,
    optional:true
  }
});

//Publish friend records with their related user records
Meteor.publish("friends", function (options) {
  if(!this.userId){
    return this.ready();
  }

  options = options || {};

  check(options, publicationOptionsSchema);

  Meteor.publishWithRelations({
    handle: this,
    collection: Meteor.friends,
    filter: {userId:this.userId, friendId:{$ne:this.userId}},
    options:options,
    mappings: [{
      key: 'friendId',
      collection: Meteor.users,
      options:{fields:{username:true, avatarId:true, status:true}}
    }]
  });
});

Meteor.publish('friendRequests', function(options){
  if(!this.userId){
    return this.ready();
  }

  options = options || {};

  check(options, publicationOptionsSchema);

  Meteor.publishWithRelations({
    handle: this,
    collection: Meteor.requests,
    filter: {userId:this.userId, denied:{$exists:false}, ignored:{$exists:false}},
    options:options,
    mappings: [{
      key: 'requesterId',
      collection: Meteor.users,
      options:{fields:{username:true}}
    }]
  });
});

Meteor.publish('ignoredFriendRequests', function(options){
  if(!this.userId){
    return this.ready();
  }

  options = options || {};

  check(options, publicationOptionsSchema);

  Meteor.publishWithRelations({
    handle: this,
    collection: Meteor.requests,
    filter: {userId:this.userId, denied:{$exists:false}, ignored:{$exists:true}},
    options:options,
    mappings: [{
      key: 'requesterId',
      collection: Meteor.users,
      options:{fields:{username:true}}
    }]
  });
});

Meteor.publish('outgoingFriendRequests', function(options){
 if(!this.userId){
    return this.ready();
 }

 options = options || {};

 check(options, publicationOptionsSchema);

 Meteor.publishWithRelations({
   handle: this,
   collection: Meteor.requests,
   filter: {requesterId:this.userId, denied:{$exists:false}},
   options:options,
   mappings: [{
     key: 'requesterId',
     collection: Meteor.users,
     options:{fields:{username:true}}
   }]
 });
});
