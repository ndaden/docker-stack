import moment from 'moment';

const jobName = 'TEST';
const JobService = {
    work(){
        console.log(jobName,'started @', moment().toDate());
        setTimeout(()=>{}, 10000);
        console.log(jobName,'finished @', moment().toDate());
    }
};

export default JobService;