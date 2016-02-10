Meteor.publish("getUser", function(userIdOrUsername){
  return Meteor.users.find({$or:[{_id:userIdOrUsername}, {username:userIdOrUsername}]}, {fields: {username: 1, createdAt: 1}})
});
