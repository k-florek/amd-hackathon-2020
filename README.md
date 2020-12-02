# amd-hackathon-2020
This was the website used to host the AMD Scavenger Hunt during AMD Virtual 2020. It is a simple nodejs build uses a single html page to displace questions and signup forms. The site is run setting various environment variables in the docker-compose file.  

### Environment Variables
`NODE_TLS_REJECT_UNAUTHORIZED=0` - CDC's firewall does funny things with certificates so this was a work around (not ideal in many settings).  
`ENV=dev` - flag for converting the site from developmen mode `dev` to production mode `prod`. Dev mode ignores the times below and displays all options.  
`REG_START=11/02/2020 17:00` - Registration Start Time (all times are UTC)  
`START_TIME=11/16/2020 17:00` - Close registration and start event in  
`QSET1=11/16/2020 17:00` - Time to reveal first three questions usally set to the same as `START_TIME`  
`QSET2=11/17/2020 17:00` - Time to reveal the second set of questions  
`QSET3=11/18/2020 17:00` - Time to reveal the third set of questions  
`QSET4=11/19/2020 17:00` - Time to reveal the fourth set of questions  
`END_TIME=11/20/2020 17:00` - End the event and close the questions  
`PORT=8000` -  port used for nodejs in container (don't change)  
`MONGO=mongodb://admin:adminpass1234@amd-hack-mongo:27017/amd-hackathon?authSource=admin` - Mongodb connection string  
`CAPTCHA_SECRET=` - Secret Key for google captcha  
`CAPTCHA_SITE=` - Site Key for google captcha  
`fromEmail=` - Email to send team registration notifications from this is built to use AWS SES
