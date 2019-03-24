import { RecipeListModel } from "../../recipes/models/recipe-list.model";

export interface RecipesState {
  all: RecipeListModel[],
  detail: RecipeListModel,
  toEdit: RecipeListModel
}