import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { CustomRequest, PaginationProps } from "shared/types";

export const Pagination = createParamDecorator<PaginationProps>((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<CustomRequest>();
  const queryParams = req.query;
  let paginationProps: PaginationProps;
  if(queryParams) {
    paginationProps = {
      // @ts-ignore
      skip: queryParams.skip ? Number.parseInt(queryParams.skip, 10) : undefined,
      // @ts-ignore
      limit: queryParams.limit ? Number.parseInt(queryParams.limit, 10) : undefined,
      // @ts-ignore
      sortBy: queryParams.sortBy ? (queryParams.sortBy as string | string[]).split(',') : undefined,
      // @ts-ignore
      sortOrder: queryParams.sortOrder ? (queryParams.sortOrder as string | string[]).split(',').map(Number) : undefined,
      // @ts-ignore
      globalFilter: queryParams.globalFilter,
      // @ts-ignore
      filters: queryParams.filters ?? undefined,
    }
  }
  return paginationProps;
})