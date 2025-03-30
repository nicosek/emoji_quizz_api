const BasePolicy = require("./base_policy");
const Category = require("../models/Category");

class QuestionPolicy extends BasePolicy {
  // ✅ Peut créer une question si membre du groupe de la catégorie
  async create() {
    const categoryId = this.params.categoryId;
    const category = await Category.findById(categoryId);
    if (!category) return false;

    return this.isGroupMember(category.group);
  }

  // ✅ Peut lister ses propres questions dans la catégorie
  async index() {
    const categoryId = this.params.categoryId;
    const category = await Category.findById(categoryId);
    if (!category) return false;

    return this.isGroupMember(category.group);
  }

  // ✅ Peut voir/modifier/supprimer sa propre question uniquement
  show() {
    return this.isOwner();
  }

  update() {
    return this.isOwner();
  }

  delete() {
    return this.isOwner();
  }
}

module.exports = QuestionPolicy;
