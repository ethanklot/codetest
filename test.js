const Groq = require('groq-sdk');

const GROQ_API_KEY  = "abc";
var options = {
    // model: "mixtral-8x7b-32768",
    model: "llama3-8b-8192",
    temperature: 0.5,
    max_tokens: 1024,
    stream: false,
};

async function sendApiRequest(message, options){
    const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true});
    options.messages = [
        {role:"system", content:"You are a programming code change reviewer, provide feedback on the code changes given. Do not introduce yourselves."}, 
        { role: "user", content: message }];
    return (await groq.chat.completions.create(options)).choices[0].message;
}

async function main() {
    var res = await sendApiRequest("Hello", options);
    console.log(res);
}

main().catch(console.error);
