import * as SignalR from '@microsoft/signalr';
import StoreService from './StoreService';

export class AgentService {
  public static RpcHubConnection: string = 'AgentConnectionStatus';
  public static RpcHubBroadcast: string = 'Broadcast';
  public static RpcInvokePublish: string = 'PublishToMqttBroker';

  private static instance: AgentService;
  public readonly Hub: SignalR.HubConnection;

  private constructor(hubEndpoint: string) {
    this.Hub = new SignalR.HubConnectionBuilder().withUrl(hubEndpoint).build();
  }

  public static hasInstance(): boolean {
    return !!this.instance;
  }

  public static async connect() {
    let accessToken = await StoreService.getBearerToken();
    AgentService.instance = new AgentService(
      `http://agent.sensehome.online/agenthub?access_token=${accessToken}`,
    );
    return AgentService.instance;
  }

  public static getInstance(): AgentService {
    return AgentService.instance;
  }

  public dispose() {}
}
