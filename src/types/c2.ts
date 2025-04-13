
export interface C2Server {
  id: number;
  name: string;
  type: string;
  address: string;
  port: number;
  status: "online" | "offline";
  clients: number;
}
