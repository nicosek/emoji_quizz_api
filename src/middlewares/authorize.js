const { ForbiddenError } = require("../utils/errors");
const _ = require("lodash");

const authorize = (Model, action) => {
  return async (req, res, next) => {
    // ✅ 1. Récupération du record (s'il y a un `req.params.id`)
    const record = req.params.id ? await Model.findById(req.params.id) : null;
    req.record = record;

    // ✅ 2. Chargement de la Policy (erreur naturelle si inexistante)
    const modelName = _.snakeCase(Model.modelName); // ✅ grâce à Lodash
    const PolicyClass = require(`../policies/${modelName}_policy`);

    // ✅ 3. Vérification de l'autorisation via la Policy (erreur naturelle si action non définie)
    const policy = new PolicyClass(req);

    const isAuthorized = await policy[action]();
    if (!isAuthorized) {
      return next(new ForbiddenError()); // 🔥 Erreur 403
    }

    next();
  };
};

module.exports = authorize;
