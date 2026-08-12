import type { Branch, BranchInput } from "@/types/branch";

export const db = {
  all: () => [] as Branch[],
  create: (input: BranchInput) => { return {} as Branch; },
  update: (id: string, input: BranchInput) => { return {} as Branch; },
  remove: (id: string) => { return true; }
};