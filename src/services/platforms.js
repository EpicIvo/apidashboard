class PlatformService {

    constructor() {

        this.base = window.location.protocol + '//' + window.location.host;
    }

    get() {
        return fetch(this.base + '/v1/platforms').then(res => res.json());
    }
}

export default PlatformService;