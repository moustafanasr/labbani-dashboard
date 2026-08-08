import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";
import { branchSchema } from "@/lib/branch-schema";
export async function GET(){ return NextResponse.json(db.all()); }
export async function POST(req:Request){
  const parsed=branchSchema.safeParse(await req.json());
  if(!parsed.success) return NextResponse.json({message:"Invalid branch data",issues:parsed.error.issues},{status:400});
  return NextResponse.json(db.create(parsed.data),{status:201});
}
