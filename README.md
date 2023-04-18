# OpenAI Text Moderation Server

This project is a Node.js server built with Express.js and OpenAI's API for text moderation. It provides a REST API for moderating user-generated content, such as messages or comments.

## Prerequisites

Before you can run the server, you'll need to:

- Have an OpenAI API key. You can sign up for an API key [here](https://beta.openai.com/signup/).

- Install Node.js and npm on your local machine.

## Getting started

1. Clone the repository:


```bash
git clone https://github.com/hppanpaliya/openai-text-moderation-server
cd openai-text-moderation-server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory of the project and add your OpenAI API key:

```bash
OPENAI_API_KEY={your_api_key}
```

4. Run the server:

```bash
npm start
```

The server will start on port 4000 by default. You can change the port by setting the `PORT` environment variable.

## API endpoints

The server provides the following endpoints:

- `GET /`: A simple endpoint to check server that returns "Hello World!".

- `POST /moderate`: An endpoint for moderating user-generated content. Expects a JSON payload with the following properties:

- `userId`: A unique identifier for the user who generated the content.

- `message`: The text message to be moderated.

Returns a JSON payload with a single property, `output`, which contains the moderated message.

## Contributing

Contributions are welcome! If you find a bug or have an idea for a new feature, please open an issue or a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
