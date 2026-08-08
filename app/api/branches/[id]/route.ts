import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";
import { branchSchema } from "@/lib/branch-schema";
export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}){
  const {id}=await params; const parsed=branchSchema.safeParse(await req.json());
  if(!parsed.success) return NextResponse.json({message:"Invalid branch data"},{status:400});
  const branch=db.update(id,parsed.data); return branch?NextResponse.json(branch):NextResponse.json({message:"Not found"},{status:404});
}
export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){
  const {id}=await params; return db.remove(id)?new NextResponse(null,{status:204}):NextResponse.json({message:"Not found"},{status:404});
}
