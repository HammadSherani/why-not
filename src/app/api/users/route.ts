import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/server/services/user.service";
import { createUserSchema } from "@/server/validations/user.schema";
import { HTTP_STATUS } from "@/constants";
import type { ApiResponse } from "@/types";

export async function GET() {
  const users = await userService.list();
  return NextResponse.json<ApiResponse<typeof users>>({ success: true, data: users });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  try {
    const user = await userService.create(parsed.data);
    return NextResponse.json<ApiResponse<typeof user>>(
      { success: true, data: user },
      { status: HTTP_STATUS.CREATED }
    );
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Email already exists" },
      { status: HTTP_STATUS.CONFLICT }
    );
  }
}
