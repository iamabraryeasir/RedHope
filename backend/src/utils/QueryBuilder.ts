/**
 * Node Modules
 */
import { Query } from 'mongoose';

/**
 * Local Modules
 */
import { excludeField } from '@/constants';

/**
 * Query Builder Logic
 */
export class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public readonly query: Record<string, string>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    filter(): this {
        const filter = { ...this.query };

        for (const field of excludeField) {
            delete filter[field];
        }

        this.modelQuery = this.modelQuery.find(filter);

        return this;
    }

    search(searchableField: string[]): this {
        const searchTerm = this.query.searchTerm || '';
        const searchQuery = {
            $or: searchableField.map((field) => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        };
        this.modelQuery = this.modelQuery.find(searchQuery);
        return this;
    }

    sort(): this {
        const sort = this.query.sort || '-createdAt';

        this.modelQuery = this.modelQuery.sort(sort);

        return this;
    }

    fields(inAppFieldsSelect: string = '', excludeFields: string[] = []): this {
        const fields = this.query.fields?.split(',').join(' ') || '';
        const excludeStr = excludeFields.map((f: string) => `-${f}`).join(' ');

        const isInclusion = fields
            .split(' ')
            .some((f) => f && !f.startsWith('-'));

        if (inAppFieldsSelect) {
            const inAppFields = inAppFieldsSelect.split(',').join(' ');
            if (isInclusion) {
                this.modelQuery = this.modelQuery.select(
                    [inAppFields, fields].filter(Boolean).join(' '),
                );
            } else {
                this.modelQuery = this.modelQuery.select(
                    [inAppFields, fields, excludeStr].filter(Boolean).join(' '),
                );
            }
            return this;
        }

        if (isInclusion) {
            this.modelQuery = this.modelQuery.select(fields);
        } else {
            this.modelQuery = this.modelQuery.select(
                [fields, excludeStr].filter(Boolean).join(' '),
            );
        }

        return this;
    }

    paginate(): this {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);

        return this;
    }

    build() {
        return this.modelQuery;
    }

    async getMeta() {
        const filter = (this.modelQuery as any)._conditions || {};
        const totalDocuments =
            await this.modelQuery.model.countDocuments(filter);

        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;

        const totalPage = Math.ceil(totalDocuments / limit);

        return { page, limit, total: totalDocuments, totalPage };
    }
}
