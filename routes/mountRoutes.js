const categoryRoutes = require('../routes/categoriesRoutes');



const mountRoutes = (app) => {
    app.use('/api/v1/category', categoryRoutes);
}




module.exports = mountRoutes;