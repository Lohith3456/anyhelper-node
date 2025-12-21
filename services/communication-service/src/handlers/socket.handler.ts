import { Server as SocketIOServer, Socket } from 'socket.io';
import { CommunicationService } from '../services/communication.service';

export class SocketHandler {
  private io: SocketIOServer;
  private communicationService: CommunicationService;

  constructor(io: SocketIOServer) {
    this.io = io;
    this.communicationService = new CommunicationService(io);
  }

  initialize() {
    this.io.on('connection', (socket: Socket) => {
      console.log(`User connected: ${socket.id}`);

      // Join user's personal room
      socket.on('join_user', (userId: string) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
      });

      // Join conversation room
      socket.on('join_conversation', (conversationId: string) => {
        socket.join(conversationId);
        console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
      });

      // Leave conversation room
      socket.on('leave_conversation', (conversationId: string) => {
        socket.leave(conversationId);
        console.log(`Socket ${socket.id} left conversation ${conversationId}`);
      });

      // Handle sending messages
      socket.on('send_message', async (data: {
        conversationId: string;
        senderId: string;
        receiverId: string;
        content: string;
        type?: 'text' | 'image' | 'file';
      }) => {
        try {
          const message = await this.communicationService.sendMessage(data);
          // Message is already emitted in the service
        } catch (error) {
          socket.emit('error', { message: 'Failed to send message' });
        }
      });

      // Handle typing indicators
      socket.on('typing', (data: { conversationId: string; userId: string }) => {
        socket.to(data.conversationId).emit('user_typing', {
          userId: data.userId,
          conversationId: data.conversationId,
        });
      });

      socket.on('stop_typing', (data: { conversationId: string; userId: string }) => {
        socket.to(data.conversationId).emit('user_stopped_typing', {
          userId: data.userId,
          conversationId: data.conversationId,
        });
      });

      // Handle call initiation (for future video/voice call features)
      socket.on('initiate_call', (data: { receiverId: string; callType: 'audio' | 'video' }) => {
        socket.to(data.receiverId).emit('incoming_call', {
          callerId: socket.id,
          callType: data.callType,
        });
      });

      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }
}

