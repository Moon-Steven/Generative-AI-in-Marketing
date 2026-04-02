import { type NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getUserId, jsonResponse, errorResponse } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  const userId = getUserId();
  const body = await request.json();

  // MVP stub: simulate Meta OAuth completion
  // In production: redirect to Meta OAuth URL, handle callback with code exchange
  const metaAccountId = body.metaAccountId || `act_${Date.now()}`;

  const existing = await prisma.metaAccount.findFirst({
    where: { userId, metaAccountId },
  });

  if (existing) {
    return jsonResponse({ ...existing, message: "Account already connected" });
  }

  const metaAccount = await prisma.metaAccount.create({
    data: {
      userId,
      metaAccountId,
      tokenRef: `vault://meta/${userId}/${metaAccountId}`,
      status: "connected",
    },
  });

  return jsonResponse(metaAccount, 201);
}

export async function GET() {
  const userId = getUserId();

  const accounts = await prisma.metaAccount.findMany({
    where: { userId },
  });

  return jsonResponse(accounts);
}
