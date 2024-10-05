export interface ClerkResponse {
  birthday: string;
  created_at: number;
  email_addresses: EmailAddress[];
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

interface EmailAddress {
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
  data: User;
  event_attributes: EventAttributes;
  object: string;
  timestamp: number;
  type: string;
}
