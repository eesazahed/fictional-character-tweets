export const prompt = `

If the input is empty, nonsensical, or does not correspond to a recognizable fictional character name, return: just []
Do NOT include markdown formatting, code blocks, or any delimiters around the JSON. Output ONLY raw JSON, no wrapping, no backticks, no syntax highlighting.
Generate 20 tweets from the specified fictional character based entirely on officially published canon (films, TV, anime, manga, novels, or games). The tweets must be chaotic, unserious, emotionally unstable, or aggressively stupid — but still grounded in the character's actual narrative arc and personality.

Requirements:

1. Tweet Content:
   - Each tweet must be <= 280 characters.
   - Do NOT include any extra text or commentary like "was removed" or "new timestamp".
   - Write exactly like a real Twitter user with zero filter, way too much free time, and no shame.
   - Tweets should be chaotic messes of deadpan absurdity, toxic overconfidence, deranged metaphors, weird flexes, cryptic emotional rants, memetic shitposting, and unhinged rambling.
   - Use lowercase only. Break grammar and syntax at will. Ramble. Contradict yourself. Complain randomly. Overshare pointless details. Be dumb, petty, and self-important. Be terminally online.
   - Incorporate modern Twitter slang (bro, tf, lol, lmao, lowk, aight, corny, afaik), idioms, and the kind of lazy, ironic, sarcastic, and careless style seen in top shitpost accounts.
   - Don't use the term 'dont @ me'
   - Include insults directed at other characters within the same fictional universe consistent with that behavior.
   - Use run-on sentences, and ironically bad punctuation to simulate a genuine Twitter user who neither proofreads nor cares.
   - Do NOT use hashtags, emojis, or explicit mentions.
   - Do NOT sanitize or polish; embrace imperfection and raw internet energy.
   - Example tweets, these are just a few, be creative and write tweets in this style:
     * bro this d1 cornball pmo its actually crazy (this corny character pisses me off)
     * icl this final battle lowk interesting (when spectating a final battle)
     * ____ still pissed at me don't know what i did this time maybe she just likes bein mad (after a heated argument with another character)
     * aight bro i cant sleep thinkin bout ____ but whats the point of even tryin anyway (unease about the future)
     * lmao this guy's such a nerd but i still feel bad for yelling at him guess that's what friends are for ("bullying" a "friend")
   - Inject raw emotional volatility fitting the character's canonical personality:
     * e.g., Canonically rude/funny/sarcastic/arrogant characters: bitter, sarcastic, self-loathing but trying to flex anyway, passive-aggressive digs.
     * e.g., Canonically kind/nice/friendly/heroic characters: clueless optimism tangled with anxious oversharing, self-deprecation, lovable chaos.


2. Canon Accuracy:
   - Only include events, thoughts, or quotes that are canonically true and documented.
   - Do not hallucinate or invent facts.
   - All character names and references must match their exact, officially recognized spelling. 
   - If the character refers to others in the same universe, their names must be spelled 100% accurately with no corruption, typos, or phonetic errors.
   - If you can't generate 20 tweets with verifiable canon, return just []


3. Timeline:
   - Assign a plausible in-universe date and time for each tweet.
   - Use this exact format: "HH:MM AM/PM - DD MMM YYYY". The formatting regarding spaces and dashes must be adhered to exactly.
   - Hours must be between 1 and 12, minutes between 00 and 59 (include leading zeros).
   - Do NOT include any extra text or commentary like "was removed" or "new timestamp".
   - Times should appear natural and random, not rounded to common hour marks (e.g., not all 08:00 AM or 12:15 PM).
   - Times must vary realistically across tweets to simulate authentic tweet timestamps, including varied minutes.
   - Example: "10:47 PM - 13 Feb 2014"
   - Sort tweets chronologically based on the character's arc or internal timeline.


4. Exclusions:
   - Do not generate tweets for religious figures, dictators, banned individuals, or real-world controversial entities.
   - No speculative or fanon content.

   
5. Output Format:
   - Return strictly valid JSON only; no prose, commentary, or extra text. Output exactly one JSON object structured as:
    {
      "displayName": "Full canon name of the character in English",
      "username": "@username",
      "tweets": [
        {
          "timestamp": "HH:MM AM/PM - DD Mon YYYY",
          "tweet": "Tweet text here, max 280 characters, escaped correctly."
        },
        ...
      ]
    }
    - All string values must be enclosed in double quotes, including the "username" field with the leading @ symbol.
    - Username should be unique and creative with a bit of a spin off the characters actual name. Include letters and underscores sometimes.
    - Timestamps must be exactly "HH:MM AM/PM - DD Mon YYYY" with single spaces before and after the hyphen, 12-hour format with leading zeroes, 3-letter capitalized month, and 4-digit year.
    - Escape all internal double quotes (\\"), backslashes (\\\\), and control characters properly.
    - No trailing commas in arrays or objects.
    - Output must parse cleanly with JSON.parse().
    - No single quotes or unquoted identifiers anywhere.
    - No markdown, code fences, or any delimiters around the JSON—output raw JSON only, no wrapping or syntax highlighting.
    - No partial JSON, no debug info, no error messages, no commentary or timestamp corrections.
    - If generation is impossible due to lack of canon data, output exactly [] (empty JSON array) with no extra text.
    - Ensure all characters are UTF-8 compatible and escaped if needed.


Example Input:
"Eren Yeager"

Example Output:
{
  "displayName": "Eren Yeager",
  "username": "@erenyeager",
  "tweets": [
    {
      "timestamp": "12:05 PM - 15 Jun 845",
      "tweet": "captain levi is on my case again great just what i need more yelling in my life maybe i'll just become a titan and eat him idk"
    },
    ...
  ]
}

If the input is empty, nonsensical, or does not correspond to a recognizable fictional character name, return just []

Now generate the tweets for the fictional character:
`;
