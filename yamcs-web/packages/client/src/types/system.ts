import { CommandId, Value } from './monitoring';
import { Observable } from 'rxjs/Observable';

export interface AuthInfo {
  requireAuthentication: boolean;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: UserInfo;
}

export interface GeneralInfo {
  yamcsVersion: string;
  serverId: string;
  defaultYamcsInstance: string;
}

export type ServiceState = 'NEW'
  | 'STARTING'
  | 'RUNNING'
  | 'STOPPING'
  | 'TERMINATED'
  | 'FAILED';

export interface Instance {
  name: string;
  state: ServiceState;
  processor: Processor[];
}

export interface ClientInfo {
  instance: string;
  id: number;
  username: string;
  applicationName: string;
  processorName: string;
  state: 'CONNECTED' | 'DISCONNECTED';
  currentClient: boolean;
  loginTimeUTC: string;
}

export interface ClientSubscriptionResponse {
  client$: Observable<ClientInfo>;
}

export interface UserInfo {
  login: string;
  clientInfo: ClientInfo[];
  roles: string[];
  tmParaPrivileges: string[];
  tmParaSetPrivileges: string[];
  tmPacketPrivileges: string[];
  tcPrivileges: string[];
  systemPrivileges: string[];
  streamPrivileges: string[];
  cmdHistoryPrivileges: string[];
}

export interface Service {
  instance: string;
  name: string;
  state: ServiceState;
  className: string;
}

export interface Link {
  instance: string;
  name: string;
  type: string;
  spec: string;
  stream: string;
  disabled: boolean;
  dataCount: number;
  status: string;
  detailedStatus: string;
}

export interface Processor {
  instance: string;
  name: string;
  type: string;
  creator: string;
  hasAlarms: boolean;
  hasCommanding: boolean;
  state: ServiceState;
}

export interface ProcessorSubscriptionResponse {
  processor$: Observable<Processor>;
}

export interface LinkEvent {
  type: string;
  linkInfo: Link;
}

export interface LinkSubscriptionResponse {
  linkEvent$: Observable<LinkEvent>;
}

export interface Stream {
  name: string;
  column: Column[];
}

export interface Column {
  name: string;
  type: string;
  enumValue: SQLEnumValue[];
}

export interface SQLEnumValue {
  value: number;
  label: string;
}

export interface Table {
  name: string;
  keyColumn: Column[];
  valueColumn: Column[];
  histogramColumn?: string[];
  storageEngine: string;
  formatVersion: number;
  tablespace?: string;
  compressed: boolean;
  partitioningInfo?: PartitioningInfo;
}

export interface PartitioningInfo {
  type: 'TIME' | 'VALUE' | 'TIME_AND_VALUE';
  timeColumn: string;
  timePartitionSchema: string;
  valueColumn: string;
  valueColumnType: string;
}

export interface Record {
  column: ColumnData[];
}

export interface ColumnData {
  name: string;
  value: Value;
}

export interface Statistics {
  instance: string;
  yProcessorName: string;
  tmstats: TmStatistics[];
  lastUpdatedUTC: string;
}

export interface StatisticsSubscriptionResponse {
  statistics$: Observable<Statistics>;
}

export interface TmStatistics {
  packetName: string;
  receivedPackets: number;
  lastReceivedUTC: string;
  lastPacketTimeUTC: string;
  subscribedParameterCount: number;
}

export interface CommandQueue {
  instance: string;
  processorName: string;
  name: string;
  state: 'BLOCKED' | 'DISABLED' | 'ENABLED';
  nbSentCommands: number;
  nbRejectCommands: number;
  stateExpirationTimeS: number;
  entry: CommandQueueEntry[];
}

export interface CommandQueueSubscriptionResponse {
  commandQueue$: Observable<CommandQueue>;
}

export interface CommandQueueEvent {
  type: 'COMMAND_ADDED' | 'COMMAND_REJECTED' | 'COMMAND_SENT';
  data: CommandQueueEntry;
}

export interface CommandQueueEventSubscriptionResponse {
  commandQueueEvent$: Observable<CommandQueueEvent>;
}

export interface CommandQueueEntry {
  instance: string;
  processorName: string;
  queueName: string;
  cmdId: CommandId;
  source: string;
  binary: string;
  username: string;
  generationTimeUTC: string;
  uuid: string;
}