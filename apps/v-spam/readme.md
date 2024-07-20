## Microservices for beginners. Spam service. Python. Scikit-learn. Kafka.

Spam service provides spam analysis of messages. I use a publish-subscribe pattern through Kafka message broker. And Scikit-learn model for text analysis.

Full code - [link](https://github.com/vinhngo1907/v-cusor)

### Whole scheme:

Short description:

- User opens the front-end application in the browser and writes messages.
- Front-end service emits messages to the api gateway through socket.io.
- Api gateway emits messages in the Kafka topic for new messages.
- Message service subscribes to the topic with new messages, saves them and publishes events into the topic for saved messages.
- Users in the front-end service receive messages in the browser from the Api gateway.
- Spam service subscribes to the Kafka topic with saved messages. Scikit-learn
 model analyzes messages. Messages which were predicted as spam do publish into the Kafka topic for analyzed messages.
- Message and User services listen to events with spam and toxic messages, mark them in the database, and apply domain logic after receiving these events.

### Scheme of spam service:

`src/index.py` - this file contains initialization of the service. `src/index.py` - this file contains initialization of the service. `main` function gets configuration, connects to Kafka consumer and producer, and provides publish-subscribe events.