
export default class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public picture: string,
    public savedRecipes: string[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
