"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const search = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search) || '';
        this.modelQuery = this.modelQuery.find({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            $or: searchableFields.map((field) => ({
                [field]: { $regex: search, $options: 'i' },
            })),
        });
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludingImportant = [
            'search',
            'sortOrder',
            'sortBy'
        ];
        // jesob field amdr filtering a drkr nei sesob baad dicchi
        excludingImportant.forEach((key) => delete queryObj[key]);
        console.log(queryObj, excludingImportant, "queryObj");
        if (queryObj === null || queryObj === void 0 ? void 0 : queryObj.filter) {
            this.modelQuery = this.modelQuery.find({ author: { _id: queryObj.filter } });
        }
        return this;
    }
    sort() {
        var _a, _b, _c, _d;
        let sortStr = '-createdAt';
        if (((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) && ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortOrder)) {
            const sortBy = (_c = this === null || this === void 0 ? void 0 : this.query) === null || _c === void 0 ? void 0 : _c.sortBy;
            const sortOrder = (_d = this === null || this === void 0 ? void 0 : this.query) === null || _d === void 0 ? void 0 : _d.sortOrder;
            // "-price" othoba "price"
            sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
        }
        //  console.log(sortStr,"sortStr")
        this.modelQuery = this.modelQuery.sort(sortStr);
        return this;
    }
}
exports.default = QueryBuilder;
