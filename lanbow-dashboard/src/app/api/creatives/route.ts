import { type NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getUserId, parsePagination, paginatedResponse, jsonResponse, errorResponse } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  const userId = getUserId();
  const { page, perPage, skip, q } = parsePagination(request);

  const where: Record<string, unknown> = { userId };
  if (q) where.headline = { contains: q };

  const [creatives, total] = await Promise.all([
    prisma.creative.findMany({
      where,
      include: { campaign: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      skip,
      take: perPage,
    }),
    prisma.creative.count({ where }),
  ]);

  return paginatedResponse(creatives, total, page, perPage);
}

export async function POST(request: NextRequest) {
  const userId = getUserId();
  const body = await request.json();

  if (!body.campaignId) return errorResponse("campaignId is required");

  const creative = await prisma.creative.create({
    data: {
      userId,
      campaignId: body.campaignId,
      type: body.type || "image",
      headline: body.headline || "",
      bodyText: body.bodyText || "",
      cta: body.cta || "",
      assetUrl: body.assetUrl || "",
      status: body.status || "draft",
      predictedCtr: body.predictedCtr || 0,
      image: body.image || "",
    },
  });

  return jsonResponse(creative, 201);
}
