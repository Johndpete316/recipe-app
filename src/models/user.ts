import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public username: string,
    public email: string,
    public savedRecipes: ObjectId[],
    public createdAt: Date,
    public updatedAt: Date,
    public _id?: ObjectId // Optional property for existing documents in the database
  ) {}
}
