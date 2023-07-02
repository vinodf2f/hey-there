export interface Person {
    uid: number;
    name: string;
    location: {
      latitude: number;
      longitude: number;
    };
  }