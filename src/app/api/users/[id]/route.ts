import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/server/services/user.service";
import { updateUserSchema } from "@/server/validations/user.schema";
import { HTTP_STATUS } from "@/constants";
import type { ApiResponse } from "@/types";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const user = await userService.getById(id);

  if (!user) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "User not found" },
      { status: HTTP_STATUS.NOT_FOUND }
    );
  }

  return NextResponse.json<ApiResponse<typeof user>>({ success: true, data: user });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await req.json();
  const parsed = updateUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  const user = await userService.update(id, parsed.data);
  return NextResponse.json<ApiResponse<typeof user>>({ success: true, data: user });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  await userService.remove(id);
  return NextResponse.json<ApiResponse<{ id: string }>>({ success: true, data: { id } });
}
