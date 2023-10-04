const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    recipes: [Recipe]
  }

type Ingredient {
  _id: ID
  text: String
  foodId: String
  image: String 
}

  type Recipe {
    _id: ID
    label: String
    healthLabels: [String]
    image: String
    ingredients: [Ingredient]
    url: String

    }

   type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    recipes(username: String): [Recipe]
    recipe(recipeId: ID!): Recipe
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(label: String, healthLabels: [String], image: String, url: String): User
    removeRecipe(recipeId: ID!): User
   
  }
`;

module.exports = typeDefs;
