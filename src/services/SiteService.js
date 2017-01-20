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

  save(site) {
    return fetch(this.base + '/v1/sites/' + site._id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(site)
    }).then(res => res.json());
  }
}

export default SiteService;
