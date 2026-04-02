import { type NextRequest } from "next/server";

const DEFAULT_USER_ID = "user-1";

export function getUserId(): string {
  return DEFAULT_USER_ID;
}

export function parsePagination(request: NextRequest) {
  const url = request.nextUrl;
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const perPage = Math.min(100, Math.max(1, parseInt(url.searchParams.get("per_page") || "20")));
  const sort = url.searchParams.get("sort") || "createdAt";
  const order = (url.searchParams.get("order") || "desc") as "asc" | "desc";
  const q = url.searchParams.get("q") || "";
  const status = url.searchParams.get("status") || "";

  return { page, perPage, sort, order, q, status, skip: (page - 1) * perPage };
}

export function jsonResponse(data: unknown, status = 200) {
  return Response.json({ data }, { status });
}

export function paginatedResponse(
  data: unknown[],
  total: number,
  page: number,
  perPage: number
) {
  return Response.json({
    data,
    meta: {
      page,
      per_page: perPage,
      total,
      total_pages: Math.ceil(total / perPage),
    },
  });
}

export function errorResponse(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}
