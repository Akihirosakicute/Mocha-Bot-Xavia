const config = {
    name: "blackbox",
    aliases: ["blackbox"], // name and alias are the same
    description: "Interacts with the Blackbox Conversational AI.",
    usage: "[query]",
    cooldown: 5,
    permissions: [1, 2],
    credits: "Coffee",
};

async function onCall({ message, args }) {
    const query = args.join(" ") || "hello"; // Use user input or default to "hello"
    const apiUrl = `https://openapi-idk8.onrender.com/blackbox?chat=${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Only send the response field from the API
        if (data && data.response) {
            await message.send(data.response);
        } else {
            await message.send("No response from the API.");
        }
    } catch (error) {
        console.error("Error fetching from the API:", error);
        await message.send("An error occurred while fetching data.");
    }
}

export default {
    config,
    onCall,
};
