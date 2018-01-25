import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ProfilesCollection } from 'meteor/socialize:user-profile';

export default function () {
  /**
   * Get a profile for the specified user.
   * @param {String} userIdOrUsername
   * @return {MongoDB pointer}
   */
  Meteor.publish('profile.for', (userIdOrUsername) => {
    check(userIdOrUsername, String);
    return ProfilesCollection.find(
      { $or: [ { _id: userIdOrUsername }, { username: userIdOrUsername } ] },
      { limit: 1 }
    );
  });

  /**
   * Get a profile for the current user.
   * @return {MongoDB pointer}
   * TODO pass a list of fields in
   */
  Meteor.publish('profile', function () {
    return ProfilesCollection.find(
      { _id: this.userId },
      { limit: 1 }
    );
  });
}
