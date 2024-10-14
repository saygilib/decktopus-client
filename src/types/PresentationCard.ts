export interface UserType {
  id: number;
  username: string;
  
}

export interface PresentationCardType {
  [x: string]: any;
  createdBy: UserType;
  thumbnail: string;
  presentationName: string;
  updatedAt: string;
  id: number;
  createdAt:string
  onDelete: (id: number) => void;
  onUpdate: (id: number,newName: string) => void;
}
