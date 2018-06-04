/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const cookbook = require('alexa-cookbook.js');
const request = require('request');
const MICROBOT_URL = 'https://o1.prota.space/microbot/do/mibp.press?_id=fa25c1ffb14e13d960c9f38332f8ebe4'; 

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'The Space Facts skill can\'t help you with that.  It can help you discover facts about space if you say tell me a space fact. What can I help you with?';
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================

const data = [
  'A year on Mercury is just 88 days long.'
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const randomFact = cookbook.getRandomItem(data);
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};


const StartNow={
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return  (request.type === 'IntentRequest'
        && request.intent.name === 'StartNow');
  },
  handle(handlerInput) {
 request(MICROBOT_URL, { json: true }, (err, res, body) => {
     if (err) { return console.log(err); }

       
      });
      const speechOutput = 'Done. ';
     return handlerInput.responseBuilder
          .speak(speechOutput)
          .getResponse();
  },
};

const SetButton = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return  (request.type === 'IntentRequest'
        && request.intent.name === 'SetButton');
  },
  handle(handlerInput) {
    // const device = handlerInput.requestEnvelope.request.intent.slots['device'].value;

    const speechOutput = 'Do you want to turn it on now, when greenest, or when cheapest?';

    return handlerInput.responseBuilder
          .speak(speechOutput)

      .reprompt()
       
      .getResponse();
  },
};


const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const FallbackHandler = {
  // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.
  //              This handler will not be triggered except in that locale, so it can be
  //              safely deployed for any locale.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};


 const CurrentPrice = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return  (request.type === 'IntentRequest'
        && request.intent.name === 'CurrentPrice');
  },
  handle(handlerInput) {
   // const speechOutput = 'The current price is 12.6 pence.';
    const speechOutput = 'The current price is  8.82 pence. It is the cheapest rate today.';
    
    return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt()

      .getResponse();
  },
};

const CheapestPrice  = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return  (request.type === 'IntentRequest'
        && request.intent.name === 'CheapestPriceToday');
  },
  handle(handlerInput) {
    const speechOutput = 'The Cheapest price is 8.82 pence at 3:30 AM';

    return handlerInput.responseBuilder
          .speak(speechOutput)


      .getResponse();
  },
};


const Cheapest = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return  (request.type === 'IntentRequest'
        && request.intent.name === 'Cheapest');
  },
  handle(handlerInput) {
    const speechOutput = 'Scheduled that for 2.30 AM - you will save 20% compared with the price now';

    return handlerInput.responseBuilder
          .speak(speechOutput)


      .getResponse();
  },
};

const Greenest = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return  (request.type === 'IntentRequest'
        && request.intent.name === 'Greenest');
  },
  handle(handlerInput) {
    const speechOutput = 'Sure. I can do that, dryer will switch on at 2am. You will save 21% of green house gas emissions compared with starting now.';

    return handlerInput.responseBuilder
          .speak(speechOutput)


      .getResponse();
  },
};


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
    SetButton,
    CurrentPrice,
    Cheapest,
    Greenest,
    CheapestPrice,
    StartNow
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
