const axios = require("axios");

module.exports = {
  config: {
    name: "art2",
    version: "2.1",
    role: 0,
    author: "xnil",
    description: "Generate images with Flux.1 Pro",
    category: "ai image",
    preimum: true,
    guide: "{pn} [prompt]",
    countDown: 15,
  },

  onStart: async function({ message, event, args, getLang, api }) {
    try {
      const prompt = args.join(" ");
      const startTime = new Date().getTime();
      const ok = message.reply("wait baby <😘");
      api.setMessageReaction("⌛", event.messageID, (err) => {}, true);
      const web = "42web.io",
      const response = await axios({
        method: "get",
        url: `https://www.x-noobs-apis.${web}/art2?prompt=${encodeURIComponent(prompt)}`,
        responseType: "stream",
      });

      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      message.unsend(ok.messageID);

      const endTime = new Date().getTime();
      await message.reply({
        body: `Here's your image\nModel Name: "art"\nTime Taken: ${(endTime - startTime) / 1000} second/s`,
        attachment: response.data,
      });
    } catch (e) {
      message.reply("Error: " + e.message);
    }
  },
};
