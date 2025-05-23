import os
from dotenv import dotenv_values


def getConfig():
    config = {
        **dotenv_values("./config/.env"),  # load shared development variables
        # **dotenv_values("./config/.env.prod"),  # load sensitive variables
        **os.environ,  # override loaded values with environment variables
    }

    return {
        "KAFKA_URI": config["KAFKA_URI"],
        "KAFKA_MECHANISM": config["KAFKA_MECHANISM"],
        "KAFKA_USER": config["KAFKA_USER"],
        "KAFKA_PASS": config["KAFKA_PASS"],
        "KAFKA_READY_MESSAGE_TOPIC": config.get("KAFKA_READY_MESSAGE_TOPIC"),
        "KAFKA_READY_MESSAGE_GROUP": config.get("KAFKA_READY_MESSAGE_GROUP"),
        "KAFKA_ANALYSIS_MESSAGE_TOPIC": config.get("KAFKA_ANALYSIS_MESSAGE_TOPIC"),
        "KAFKA_ANALYSIS_MESSAGE_GROUP": config.get("KAFKA_ANALYSIS_MESSAGE_GROUP"),
    }
