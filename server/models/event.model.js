const mongoose = require('mongoose');

const eventSchemaObject = {
    eventName: {type: String},
    eventOrganizerName: {type: String},
    eventDate: {type: String},
    eventTime: {type: String},
    eventVenue: {type: String}
};

const eventSchema = new mongoose.Schema(eventSchemaObject);

module.exports = mongoose.model('Events', eventSchema);

