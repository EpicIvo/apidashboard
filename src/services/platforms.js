class PlatformService {

    constructor() {

        this.base = window.location.protocol + '//' + window.location.host;
    }

    get() {
        return fetch(this.base + '/v1/platforms').then(res => res.json());
    }

    getById(id) {
        return fetch(this.base + '/v1/platforms/' + id).then(res => res.json());
    }

    getCommits(id) {
        return fetch(this.base + '/v1/platforms/' + id + '/commits').then(res => res.json());
    }

    getBuilds(id) {
        return fetch(this.base + '/v1/platforms/' + id + '/builds').then(res => res.json());
    }
}

export default PlatformService;