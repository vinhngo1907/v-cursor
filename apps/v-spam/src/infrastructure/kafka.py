import json
from kafka import KafkaConsumer
from kafka import KafkaProducer

def getKafkaConsumer(config):
    print(">>>>>", config)
    return KafkaConsumer(
        config["KAFKA_READY_MESSAGE_TOPIC"],
        # bootstrap_servers=[config["KAFKA_URI"]],
        bootstrap_servers=['127.0.0.1:9092'],
        api_version=(0,10),
        group_id=config["KAFKA_READY_MESSAGE_GROUP"],
        security_protocol='SSL',  # Use 'SASL_SSL' for encrypted communication
        sasl_mechanism=config["KAFKA_MECHANISM"],
        sasl_plain_username=config["KAFKA_USER"],  # Kafka username
        sasl_plain_password=config["KAFKA_PASS"],  # Kafka password
        value_deserializer=lambda m: json.loads(m.decode("utf-8")),
    )


def getKafkaProducer(config):
    return KafkaProducer(
        bootstrap_servers=[config["KAFKA_URI"]],
        value_serializer=lambda v: json.dumps(v).encode("utf-8"),
    )