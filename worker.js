export default {
  async fetch(request, env) {
    if (request.headers.get("Upgrade") != "websocket") {
        return new Response("hi");
    }

    const pair = new WebSocketPair();

    const client = pair[0];
    const server = pair[1];

    server.accept();

    const backend = new WebSocket(env.SERVER);

    backend.addEventListener("open", () => {
        server.addEventListener("message", event => {
            backend.send(event.data);
        });

        backend.addEventListener("message", event => {
            server.send(event.data);
        });
    });

    server.addEventListener("close", () => {
        backend.close();
    });

    backend.addEventListener("close", () => {
        server.close();
    });

    return new Response(null, {
        status: 101,
        webSocket: client
    });
  }
}