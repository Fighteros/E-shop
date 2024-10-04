const categoryRoutes = require("./categoriesRoutes");
const subcategoryRoutes = require('./subCategoryRoutes');
const brandRoutes = require('./brandRoutes')

const mountRoutes = (app) => {
    app.use('/api/v1/categories', categoryRoutes);
    app.use('/api/v1/subcategories', subcategoryRoutes);
    app.use('/api/v1/brands', brandRoutes)
}


module.exports = mountRoutes;