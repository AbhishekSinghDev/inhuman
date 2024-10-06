export interface ServiceType {
  type: "Google" | "Office365";
}

import { z } from "zod";

export interface SyncResponse {
  syncUpdatedToken: string;
  syncDeletedToken: string;
  ready: boolean;
}
export interface SyncUpdatedResponse {
  nextPageToken?: string;
  nextDeltaToken: string;
  records: EmailMessage[];
}

export const emailAddressSchema = z.object({
  name: z.string(),
  address: z.string(),
});

export interface EmailMessage {
  id: string;
  threadId: string;
  createdTime: string;
  lastModifiedTime: string;
  sentAt: string;
  receivedAt: string;
  internetMessageId: string;
  subject: string;
  sysLabels: Array<
    | "junk"
    | "trash"
    | "sent"
    | "inbox"
    | "unread"
    | "flagged"
    | "important"
    | "draft"
  >;
  keywords: string[];
  sysClassifications: Array<
    "personal" | "social" | "promotions" | "updates" | "forums"
  >;
  sensitivity: "normal" | "private" | "personal" | "confidential";
  meetingMessageMethod?: "request" | "reply" | "cancel" | "counter" | "other";
  from: EmailAddress;
  to: EmailAddress[];
  cc: EmailAddress[];
  bcc: EmailAddress[];
  replyTo: EmailAddress[];
  hasAttachments: boolean;
  body?: string;
  bodySnippet?: string;
  attachments: EmailAttachment[];
  inReplyTo?: string;
  references?: string;
  threadIndex?: string;
  internetHeaders: EmailHeader[];
  nativeProperties: Record<string, string>;
  folderId?: string;
  omitted: Array<
    "threadId" | "body" | "attachments" | "recipients" | "internetHeaders"
  >;
}

export interface EmailAddress {
  name?: string;
  address: string;
  raw?: string;
}

export interface EmailAttachment {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  inline: boolean;
  contentId?: string;
  content?: string;
  contentLocation?: string;
}

export interface EmailHeader {
  name: string;
  value: string;
}

export interface ClerkResponse {
  birthday: string;
  created_at: number;
  email_addresses: EmailAddressResponse[];
  external_accounts: any[]; // Adjust type as needed
  external_id: string;
  first_name: string;
  gender: string;
  id: string;
  image_url: string;
  last_name: string;
  last_sign_in_at: number;
  object: string;
  password_enabled: boolean;
  phone_numbers: any[]; // Adjust type as needed
  primary_email_address_id: string;
  primary_phone_number_id: string | null;
  primary_web3_wallet_id: string | null;
  private_metadata: Record<string, any>;
  profile_image_url: string;
  public_metadata: Record<string, any>;
  two_factor_enabled: boolean;
  unsafe_metadata: Record<string, any>;
  updated_at: number;
  username: string | null;
  web3_wallets: any[]; // Adjust type as needed
}

export interface EmailAddressResponse {
  email_address: string;
  id: string;
  linked_to: any[]; // Adjust type as needed
  object: string;
  verification: Verification;
}

interface Verification {
  status: string;
  strategy: string;
}

interface HttpRequest {
  client_ip: string;
  user_agent: string;
}

interface EventAttributes {
  http_request: HttpRequest;
}

interface Event {
  data: ClerkResponse;
  event_attributes: EventAttributes;
  object: string;
  timestamp: number;
  type: string;
}
