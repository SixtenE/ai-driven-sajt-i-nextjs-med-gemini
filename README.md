# Workshop - Bygg AI-driven webbplats i Next.js med  Gemini API  👋 

## Förarbete

* Gå till [Google Studio AI](https://aistudio.google.com/), skapa konto och logga in
* Skaffa en API-nyckel och läs på hur man gör ett API-request till Gemini API

Från API-documentation i Google AI Studi

```
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = "Explain how AI works";

const result = await model.generateContent(prompt);
console.log(result.response.text());
```

* Sätt upp ett Next.js-projekt med App-router

``` npx create-next-app@latest ```

* Kom ihåg att inte exponera några API-nycklar. Använd .env-fil


## Er uppgift


1. Skapa en API-route ```/api/generate``` som  kommunicerar med Gemini API:et. Använd HTTP-metoden POST och skicka med en prompt från användaren
2. Skapa en komponent ```<ChatInterface/>``` som tar in användarens prompt från en input-ruta och sedan fetchar från API:et, d.v.s```/api/generate```  och slutligen visar svaret.
3. Skapa 2-3 sidor i Next.js där Gemini API:et används på ett kreativt sätt för att lösa olika användningsfall. 
4. Modifiera ```<ChatInterface/>``` efter behov
4. Alla sidor ska ha en enhetlig design för att skapa en sammanhängande användarupplevelse.


## Diskutera

1. Vad är skillnaden mellan klient- och serverkomponenter? 
2. Har ni använt er av, eller skulle ni kunna använda er av server-komponenter för att öka prestanda?
