export type ISocialNetwork = "Facebook" | "Instagram" | "X" | "LinkedIn";

export interface IPost {
  id: string; 
  title: string; 
  network: ISocialNetwork;
  content: string; 
}
