import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;


    }

    search(searchableFields: string[]) {
        const searchTerm = this.query.searchTerm as string;
        const email = this.query.searchTerm as string;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: searchTerm, $options: 'i' },
                        }) as FilterQuery<T>,
                ),
            });

        } else if (email) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: email, $options: 'i' },
                        }) as FilterQuery<T>,
                ),
            });

        }
        return this;
    }

    filter() {
        const queryObj = { ...this.query }; // copy
        const minPrice = Number(queryObj.minPrice);
        const maxPrice = Number(queryObj.maxPrice);

        // console.log(minPrice, maxPrice); // Ensure these are numbers

        // Filtering
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields', 'minPrice', 'maxPrice'];
        excludeFields.forEach((el) => delete queryObj[el]);

        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            this.modelQuery = this.modelQuery.find({
                ...queryObj,
                price: { $gte: minPrice, $lte: maxPrice },
            });
        } else {
            this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        }

        return this;
    }


    sort() {
        const sort = (this.query.sort as string)?.split(',')?.join(' ') || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);
        return this;
    }

    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 100;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }

    async countTotal() {
        const totalQueries = this.modelQuery.getFilter();
        const total = await this.modelQuery.model.countDocuments(totalQueries);
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const totalPage = Math.ceil(total / limit);

        return {
            page,
            limit,
            total,
            totalPage,
        };
    }
}

export default QueryBuilder;
