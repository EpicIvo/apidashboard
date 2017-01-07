import createSlug from './createSlug';
let cache;

class WorkableAPI {
    static getData() {
        if (cache) return cache;
        return cache = fetch('/workable').then(res => res.json());
    }

    static getJobs() {
        return this.getData().then(data => data.jobs.map(job => {
            job.slug = createSlug(job.full_title);
            return job;
        }));
    }

    static getJob({slug, language}) {
        return this.getJobs().then(jobs => jobs.reduce((prev, job) => {
            if (prev) return prev;

            if (job.slug == slug && job.language == language) return job;

        }, false));
    }
}

export default WorkableAPI;
