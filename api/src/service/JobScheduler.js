
const jobList = [];
const JobScheduler = {
    run(job, interval){
        jobList.push(job.jobName);
        console.log(jobList);

        setInterval(() => job.work(), interval);
    }
};

export default JobScheduler;