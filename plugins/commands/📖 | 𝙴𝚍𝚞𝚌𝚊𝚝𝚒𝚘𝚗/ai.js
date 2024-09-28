const config = {
    name: "ai",
    aliases: ["ai"], // name and alias are the same
    description: "Interact with the GPT-4 Mini API",
    usage: "[query]",
    cooldown: 5,
    permissions: [0],
    credits: "Coffee",
};

// Object to store last responses for users
const lastResponses = {};

async function onCall({ message, args }) {
    const userId = message.sender.id; // Assuming message.sender.id uniquely identifies the user
    const query = args.join(" ") || "hi"; // Use the user's query or default to "hi"
    const header = "🧋✨ | 𝙼𝚘𝚌𝚑𝚊 𝙰𝚒\n━━━━━━━━━━━━━━━━";
    const footer = "━━━━━━━━━━━━━━━━";

    // Check for previous interaction
    const previousResponse = lastResponses[userId];

    // Construct a follow-up query if there is a previous response
    const fullQuery = previousResponse ? `${previousResponse} ${query}` : query;

    try {
        const response = await fetch(`https://www.samirxpikachu.run.place/gpt4mini?prompt=${encodeURIComponent(fullQuery)}`);
        const data = await response.json();

        if (data.response) {
            await message.send(`${header}\n${data.response}\n${footer}`); // Send the response back to the user with header and footer
            
            // Update the last response for the user
            lastResponses[userId] = data.response;
        } else {
            await message.send(`${header}\nSorry, I couldn't get a response from the API.\n${footer}`);
        }
    } catch (error) {
        console.error("Error fetching from GPT-4 Mini API:", error);
        await message.send(`${header}\nAn error occurred while trying to reach the API.\n${footer}`);
    }
}

export default {
    config,
    onCall,
};