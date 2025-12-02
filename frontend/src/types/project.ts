import type { Requirement } from "./requirement";

export interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    createdBy: string;
    requirements: Requirement[];
}