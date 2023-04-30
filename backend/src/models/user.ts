import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public id: ObjectId,
    public username: string,
    public email: string,
    public picture: string,
    public savedRecipes: ObjectId[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
