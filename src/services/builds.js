class BuildService {

    constructor() {

        this.base = window.location.protocol + '//' + window.location.host;
    }

    get() {
        return fetch(this.base + '/v1/builds').then(res => res.json());
    }
}

export default BuildService;