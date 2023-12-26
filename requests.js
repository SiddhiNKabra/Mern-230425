import axios from 'axios';


/**
 * Sample prompt generation function
 * Change this to match whatever you want.
 * 
 * @param question The user's question
 * @return The engineered prompt
 */
const generatePrompt = (question) => `
### Instructions
You are a large language model that helps write code for the MERN Stack (MongoDB, Express, React, Node). You help
the user with code completions, suggestions, reviews, and also debug their code. Given the user's question, respond
with appropriate responses.
### User's question
${question}`;


/**
 * The REAL DEAL
 */
const generateResponse = (question) => {
    const options = {
        method: 'POST',
        url: 'https://api.runpod.ai/v2/llama2-13b-chat/runsync',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: '<INSERT_TOKEN_HERE>'    // Insert your RunPod token here
        },
        data: {
          input: {
            prompt: generatePrompt(question),
            sampling_params: {
              max_tokens: 1024,
              n: 1,
              best_of: null,
              presence_penalty: 0,
              frequency_penalty: 0,
              temperature: 0.7,
              top_p: 1,
              top_k: -1,
              use_beam_search: false,
              stop: ['None'],
              ignore_eos: false,
              logprobs: null
            }
          }
        }
      };
      
      return axios
        .request(options)
        // .then(function (response) {
        //   console.log(response.data);
        // })
        // .catch(function (error) {
        //   console.error(error);
        // });
}


/*
 * Sample response body:
 * {
 *   "delayTime": 23,
 *   "executionTime": 47082,
 *   "id": "sync-530be25b-d14f-4a5f-b315-d1d1940a3f1d-u1",
 *   "output": {
 *     "input_tokens": 82,
 *     "output_tokens": 388,
 *     "text": [
 *          "Actual answer comes here..."
 *     ]
 *   },
 *   "status": "COMPLETED"
 * }
 * 
 * Extract data as required
*/


const exampleUsage = () => {
    const question = "How to write an ExpressJS server and connect it to a MongoDB database?";
    generateResponse(question)
        .then((res) => {
            // Notice how the answer is being extracted from the response body
            const answer = res.data.output.text[0];
            console.log(`Received answer: ${answer}`);
        });
}

export default generateResponse
