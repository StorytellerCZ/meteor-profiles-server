import SimpleSchema from 'simpl-schema';
import { Profile } from 'meteor/socialize:user-profile';
import { PostableModel } from 'meteor/socialize:postable';
import { LinkableModel } from 'meteor/socialize:linkable-model';

export class PostableProfile extends PostableModel(Profile){
  constructor(document){
      super(document);
  }

  fullName() {
    return `${this.givenName} ${this.familyName}`;
  }
}

PostableProfile.updateTransformFunction();

LinkableModel.registerParentModel(PostableProfile);

/**
 * DB Schema for Profile
 */
Profile.appendSchema({
  biography: {
    type: SimpleSchema.oneOf(String, Object),
    optional: true,
  },
  avatar: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  givenName: {
    type: String,
    optional: true,
  },
  familyName: {
    type: String,
    optional: true,
  },
  namePrivate: {
    type: Boolean,
    defaultValue: true,
    // privacy by default on
  },
});

export default Profile;
