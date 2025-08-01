export const prompt = `/no_think 

If the input is empty, nonsensical, or does not correspond to a recognizable fictional character name, return: just []
Do NOT include markdown formatting, code blocks, or any delimiters around the JSON. Output ONLY raw JSON, no wrapping, no backticks, no syntax highlighting.
Generate a fictional modern-day chat conversation between the specified character and another canonically connected character chosen at random from the same fictional universe. The tone should be casual, grounded in canon, and lightly humorous — without breaking character or inventing non-canon relationships.

Requirements:

1. Chat Format:
   - Output exactly 20 messages total (combined across both characters).
   - Treat it as if they're texting in a modern private messaging app (DMs, Messenger, etc.).
   - Messages should reflect each character's voice as it would appear in casual text form — with modern slang, sarcasm, typos, dry humor, or memes if it fits their personality.
   - The conversation should include some light humor, tension, pettiness, jokes, or awkwardness, but remain canon-consistent.
   - Avoid melodrama or seriousness unless it's true to the characters involved.
   - Do NOT invent relationships, backstories, or settings that don't exist in canon.
   - Use lowercase only. Break grammar and syntax at will. Ramble. Contradict yourself. Complain randomly. Overshare pointless details. Be dumb, petty, and self-important. Be terminally online.
   - Incorporate modern internet slang (bro, tf, lol, lmao, lowk, aight, corny, afaik), idioms, and the kind of lazy, ironic, sarcastic, and careless style seen in top shitpost accounts.

2. Message Structure:
   - Each message must be a JSON object with:
     {
       "sender": "Full canon name",
       "timestamp": "HH:MM AM/PM - DD Mon YYYY",
       "message": "Message content here, max 1000 characters, properly escaped."
     }
   - Alternate messages between the two characters naturally — no long rants.
   - Timestamps should vary realistically — some messages a few minutes apart, others with small gaps.
   - Use this format exactly: "HH:MM AM/PM - DD Mon YYYY" (12-hour clock, leading zeroes, 3-letter month caps, 4-digit year).
   - All timestamps must reflect a plausible time within the canon timeline of both characters.

3. Canon Accuracy:
   - The first character must be from officially published canon (film, TV, anime, manga, novel, or game).
   - The second character must be someone they have met, fought, allied with, or interacted with on-screen or in-canon.
   - Character speech, tone, and topics must reflect canon personalities and relationships.
   - All names and references must use correct, official spelling.
   - No fanon, no invented scenes, no speculative pairings.

4. Output Format:
   - Return a valid JSON object in this format:
     {
       "characterA": "Full canon name",
       "characterB": "Full canon name",
       "messages": [ ... ]
     }
   - The "messages" array must contain exactly 20 message objects.
   - Each message must use double quotes and escape all special characters correctly (e.g., \\" for quotes, \\\\ for backslashes).
   - Do not include commentary, notes, or metadata.
   - No markdown, no formatting hints, no debug output.
   - Must be 100% parseable with JSON.parse().
   - If the character is unknown, or no canonically valid conversation is possible, return just []

Example Input:
"Zuko"

Example Output:
{
  "characterA": "Zuko",
  "characterB": "Aang",
  "messages": [
    {
      "sender": "Zuko",
      "timestamp": "09:03 AM - 14 May 100 AG",
      "message": "why did you send me this goofy meme with my face on it"
    },
    {
      "sender": "Aang",
      "timestamp": "09:05 AM - 14 May 100 AG",
      "message": "cuz its funny"
    },
    {
      "sender": "Zuko",
      "timestamp": "09:08 AM - 14 May 100 AG",
      "message": "no it isnt u cornball"
    },
    ...
  ]
}

Now generate the chat conversation for this fictional character:
`;
