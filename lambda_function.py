def lambda_handler(event, context):

    # response = RESPONSE_TEMPLATE.copy()

    request_type = event['request']['type']
    if request_type == "LaunchRequest":
      return send_response("How can I help", False)
    elif request_type == "IntentRequest":
      intent = event['request']['intent']['name']
      if intent == "CurrentPrice":
        return send_response("The price is 2.34 pence", True)
      elif intent == "CheapestPriceToday":
          return send_response("The cheapest price today is 0.6 pence at 2.30 AM", True)
      elif intent == "TurnOnDevice":
          return send_response("Do you want to turn on now, or when price is cheapest - at 2AM - price difference is 2.3 pence per kilo watt hours", False)

    return send_response("Not sure what sort of request this was", False)


def send_response(text, endSession):
    return {
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": text
        },
        "card": {
          "content": "Some card output to appear here",
          "title": "Card title yeah?",
          "type": "Simple"
        },
        "reprompt": {
          "outputSpeech": {
            "type": "PlainText",
            "text": "I could not catch that"
          }
        },
        "shouldEndSession": endSession
      },
      "sessionAttributes": {}
    }



RESPONSE_TEMPLATE = {
  "version": "1.0",
  "response": {
    "outputSpeech": {
      "type": "PlainText",
      "text": "hello from my app"
    },
    "card": {
      "content": "Some card output to appear here",
      "title": "Card title yeah?",
      "type": "Simple"
    },
    "reprompt": {
      "outputSpeech": {
        "type": "PlainText",
        "text": ""
      }
    },
    "shouldEndSession": False
  },
  "sessionAttributes": {}
}
