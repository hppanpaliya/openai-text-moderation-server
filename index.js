const app = require("./app");
const { monitorChatCollections } = require("./controllers/chatMonitor");

// Set port for server to listen on
const PORT = process.env.PORT || 4000;

// Start server and log message to console
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Start chat monitoring process
monitorChatCollections();
