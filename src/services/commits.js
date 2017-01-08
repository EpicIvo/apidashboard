class CommitService {

    constructor() {

        this.base = window.location.protocol + '//' + window.location.host;
    }

    get(project) {
        return fetch(this.base + '/v1/commits/' + project).then(res => res.json());
    }
}

export default CommitService;