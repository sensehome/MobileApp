import * as SignalR from "@microsoft/signalr"
import StoreService from './StoreService';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IiIsInJvbGUiOiIxIiwibmJmIjoxNjEzODkwOTY0LCJleHAiOjE2MTQ0OTU3NjQsImlhdCI6MTYxMzg5MDk2NH0.B8Fv52EWRtzrowenrr5A47yKHAfEbKkjCeDcQf7dd9Q';

export class AgentService {
  public static RpcHubConnection: string = "AgentConnectionStatus"
  public static RpcHubBroadcast: string = "Broadcast"
  public static RpcInvokePublish: string = 'PublishToMqttBroker';

  private static instance: AgentService
  public readonly Hub: SignalR.HubConnection

  private constructor(hubEndpoint: string) {
    this.Hub = new SignalR.HubConnectionBuilder()
      .withUrl(hubEndpoint)
      .build();
  }

  public static getInstance(): AgentService {

    if (!AgentService.instance) {
      AgentService.instance = new AgentService(`http://agent.sensehome.online/agenthub?access_token=${token}`)
    }
    return AgentService.instance
  }

  public dispose() {

  }
}