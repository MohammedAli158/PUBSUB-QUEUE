Express named folder is primary backend which recieves requests from frontend. When client sends a request, it gets sent to a redis queue and Workers picks
it up from there and process it and send a publisher event to another redis process running at a different port 
The pub-sub redis process emits event to primary backend since the primary backend is subscribed to pub-sub redis 
then the event is recieved by client and preferably through a websocket layer but in the current version there is no websocket 
