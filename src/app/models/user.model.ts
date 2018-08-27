export class UserModel {
  _id: string;
  email: string;
  name: string;
  following: UserModel[];
  followers: UserModel[];
}
