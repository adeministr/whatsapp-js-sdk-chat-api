module.exports = {
    onceMessageDelivered: (emiter, queueNumber, callback) => emiter.once(`ack_delivered_${queueNumber}`, callback),
    onceMessageViewed: (emiter, queueNumber, callback) => emiter.once(`ack_viewed_${queueNumber}`, callback),
}