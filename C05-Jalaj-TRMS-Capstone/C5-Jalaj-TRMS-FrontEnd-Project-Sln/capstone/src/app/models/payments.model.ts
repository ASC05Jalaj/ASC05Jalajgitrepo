export interface Payment {
    id?: string;
    amount: number;
    mode: string;
    booking: {
      id: string;  
    };
  }
  