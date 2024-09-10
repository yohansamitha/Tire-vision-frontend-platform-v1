export interface TireCheckUpDTO {
  vehicleId?: string;
  userId?: string;
  flImage: string;
  frImage: string;
  rlImage: string;
  rrImage: string;
  flResults?: string;
  frResults?: string;
  rlResults?: string;
  rrResults?: string;
  recommendation?: string;
}
