import { ObjectId } from "mongodb";

export default class Recipe {
  constructor(
    public title: string,
    public ingredients: { name: string; quantity: string }[],
    public directions: string,
    public author: ObjectId,
    public isPublic: boolean,
    public generatedByNLP: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public _id?: ObjectId // Optional property for existing documents in the database
  ) {}
}
