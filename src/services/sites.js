class SiteService {

    constructor() {

        this.base = window.location.protocol + '//' + window.location.host;
    }

    get() {
        return fetch(this.base + '/v1/sites').then(res => res.json());
    }

    getById(id) {
        return fetch(this.base + '/v1/sites/' + id).then(res => res.json());
    }
}

export default SiteService;