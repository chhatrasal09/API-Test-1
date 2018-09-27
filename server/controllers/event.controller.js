const Events = require('../models/event.model');

module.exports = {
    getData: (request, response) => {
        Events.find().then(result => {
            response.json({
                'result': result
            });
        }).catch(error => {
            console.log(error);
            response.json({
                'result': error
            });
        });
    },
    postData: (request, response) => {
        let Event = new Events({
            eventName: request.body.eventName,
            eventOrganizerName: request.body.eventOrganizerName,
            eventDate: request.body.eventDate,
            eventTime: request.body.eventTime,
            eventVenue: request.body.eventVenue
        });
        // response.json(request.body);
        Event.save(error => {
            if (error) {
                console.log(error);
            }
            response.json({
                message: 'Hi'
            });
        });
    }
};