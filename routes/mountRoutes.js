const categoryRoutes = require("./categoriesRoutes");
const subcategoryRoutes = require('./subCategoryRoutes');


const mountRoutes = (app) => {
    app.use('/api/v1/categories', categoryRoutes);
    app.use('/api/v1/subcategories', subcategoryRoutes)
}




module.exports = mountRoutes;