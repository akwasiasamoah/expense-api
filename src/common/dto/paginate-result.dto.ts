export class PaginateResultDto {
  data: Record<string, any>[];
  count: number;
  hasmore: boolean;
}
