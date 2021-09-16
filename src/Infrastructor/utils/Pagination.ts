
class Pagination {

    private defaultSize: number;
    private defaultOffset: number;
    private limit: number;
    private offset: number;
    private total: number;
    private items: any[];

    constructor() {
        this.defaultOffset = 0;
        this.defaultSize = 3;
    }

    getPagination(page: number, size: number) {
        this.limit = size ? size : this.defaultSize;
        this.offset = page ? page * this.limit : this.defaultOffset;
        return {
            limit: this.limit,
            offset: this.offset,
        };
    }

    getPaginationData() {
        return {
            total: this.total,
            hasMore: this.hasNextPage(),
            totalPages: this.getTotalNumberOfPages(),
            currentPage: this.getCurrentPage(),
            items: this.items,
        };
    }

    setTotal(total: number) {
        this.total = total;
    }

    setItems(items: any[]) {
        this.items = items;
    }

    hasNextPage() {
        return this.offset + this.limit < this.total;
    }

    getCurrentPage() {
        return Math.floor(this.offset / this.limit);
    }

    getTotalNumberOfPages() {
        return Math.floor(this.total / this.limit);
    }
    
}
export default Pagination;
