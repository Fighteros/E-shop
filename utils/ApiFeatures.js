class ApiFeatures {
    constructor(mongooseQuery, queryStr) {
        this.mongooseQuery = mongooseQuery;
        this.queryStr = queryStr;
    }


    filter() {
        //1. Filter

        const queryStringObj = { ...this.queryStr };
        const excludeFields = ["page", "sort", "limit", "fields", "keyword"]

        excludeFields.forEach(field => delete queryStringObj[field]);

        // Apply filter using [gt|gte|le|lte]
        // "{price: {$gte: 50}, ratingsAverage: {$gte: 4} }"
        // { ratingsAverage: { gte: '4.0' }, price: { gte: '50' } }
        let queryStr = JSON.stringify(queryStringObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|le)\b/g, value => `$${value}`)

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr))

        return this;
    }

    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(",").join(' ');

            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            // new to old
            this.mongooseQuery = this.mongooseQuery.sort("-createdAt")
        }


        return this;
    }

    limitFields() {
        if (this.queryStr.fields) {
            const limitBy = this.queryStr.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(limitBy);
        }
        else {
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }


        return this;
    }


    search() {
        if (this.queryStr.keyword) {
            const query = {};
            query.$or = [
                { title: { $regex: this.queryStr.keyword, $options: "i" } },
                { description: { $regex: this.queryStr.keyword, $options: "i" } },
            ];
            this.mongooseQuery = this.mongooseQuery.find(query)
        }

        return this;
    }


    paginate(countDocs) {
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 50;
        const skip = (page - 1) * limit; // (2 - 1) * 5 = 5 skip first
        const endPageIndex = page * limit;

        // Pagination result
        const pagination = {};

        pagination.currentPage = page;
        pagination.limit = limit;
        // 50  / 10 > 5 pages
        pagination.numberOfPages = Math.ceil(countDocs / limit);

        // next page
        if (endPageIndex < countDocs) {
            pagination.next = page + 1;
        }

        if (skip > 0) {
            pagination.prev = page - 1;
        }


        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);


        this.paginationResult = pagination;

        return this;
    }

}


module.exports = ApiFeatures;