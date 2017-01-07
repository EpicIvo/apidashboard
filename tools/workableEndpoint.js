import request from 'request-promise';

process.env.WORKABLE_API_KEY = 'b31aa4b5e8ca9805d08526889fe0cff389e59a997d66d94471e657d82c598a88';
const titleRegex = /\[([a-z]+):(\d+)\] (.*)/;

export default function (req, res) {

    request({
        url: 'https://www.workable.com/spi/v3/accounts/burst/jobs',
        qs: {
            include_fields: 'full_description,description,requirements,benefits'
        },
        headers: {
            authorization: `Bearer ${process.env.WORKABLE_API_KEY}`
        },
        json: true
    }).then(response => {

        // Filter and change all jobs, so they return normal data
        response.jobs = response.jobs.reduce((jobs, job) => {

            // When published, show as-is on dutch site
            if(job.state == 'published'){
                job.language = 'nl';
                jobs.push(job);
            }
            else if(job.state == 'draft' && titleRegex.test(job.title)) {
                // Get all parameters from the title
                const titleParts = titleRegex.exec(job.title);

                // Add language
                job.language = titleParts[1];

                // Replace id in urls
                job.url = job.url.replace(/\d+/, titleParts[2]);
                job.application_url = job.application_url.replace(/\d+/, titleParts[2]);

                // Change title with everything that's left
                job.title = titleParts[3];
                job.full_title = titleRegex.exec(job.full_title)[3];

                jobs.push(job);
            }
            return jobs;

        }, []);
        return response;

    }).then(response => {

        return response;

        // If fields like employment_type, industry, function, experience or education are needed,
        // use the script below
        //
        // return Promise.all(response.jobs.map(job =>
        //     request({
        //         url: `https://www.workable.com/spi/v3/accounts/burst/jobs/${job.shortcode}`,
        //         headers: {
        //             authorization: `Bearer ${process.env.WORKABLE_API_KEY}`
        //         },
        //         json: true
        //     })
        // ));

    }).then(jobs => {
        res.end(JSON.stringify(jobs));
    });

}
