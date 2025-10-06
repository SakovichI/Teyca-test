export const toId = <T extends { userId: number }>(item: T): number => item.userId;
