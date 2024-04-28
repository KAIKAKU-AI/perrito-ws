import { UtilityProcess, utilityProcess } from "electron";
import { EventEmitter } from "events";
import { ipcActionMessage } from "src/ipc/IpcMessageTypes";
interface PendingRequests {
  [key: string]: { resolve: (value?: unknown) => void; reject: (reason?: unknown) => void };
}

export default class DaemonProcess extends EventEmitter {
  private child: UtilityProcess | null;
  private pendingRequests: PendingRequests;

  constructor(private daemonPath: string) {
    super();
    this.daemonPath = daemonPath;
    this.child = null;
    this.pendingRequests = {} as PendingRequests;
  }

  start() {
    console.info("Starting daemon process");
    this.child = utilityProcess.fork(this.daemonPath, [], {
      stdio: "inherit",
    });

    this.child.on("message", this.onMessage.bind(this));
    this.child.on("exit", this.onExit.bind(this));
  }

  onMessage(message: { correlationId: string; error: unknown; data: unknown }) {
    if (message.correlationId && this.pendingRequests[message.correlationId]) {
      // Resolve or reject the promise based on the message content
      if (message.error) {
        this.pendingRequests[message.correlationId].reject(message.error);
      } else {
        this.pendingRequests[message.correlationId].resolve(message.data);
      }

      // Clean up after handling the response
      delete this.pendingRequests[message.correlationId];
    }

    this.emit("message", message);
  }

  onExit(code: number) {
    console.info(`Child process exited with code ${code}`);
    this.child = null; // Clean up reference

    this.emit("exit", code);
  }

  sendMessage(message: ipcActionMessage) {
    const correlationId = Date.now().toString() + Math.random().toString().substring(2);
    const messageWithCorrelationId = { ...message, correlationId };

    // Send the command with the correlationId to the child process
    this.child.postMessage(
      messageWithCorrelationId as ipcActionMessage & { correlationId: string },
    );

    // Return a promise that will be resolved or rejected when the child process responds
    return new Promise((resolve, reject) => {
      // Store the resolve and reject functions using the correlationId as the key
      this.pendingRequests[correlationId] = { resolve, reject };
    });
  }

  stop() {
    console.info("Stopping daemon process");
    if (this.child) {
      this.child.kill();
      this.child = null;
    }
  }
}
