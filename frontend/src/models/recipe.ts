
export default class Recipe {
  constructor(
    public title: string,
    public ingredients: [],
    public directions: string[],
    public image: string,
    public author: string,
    public isPublic: boolean,
    public generatedByNLP: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public _id?: string // Optional property for existing documents in the database
  ) {}
}
