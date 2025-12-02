import type { RequirementVersion } from "./requirementVersion";

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Complexity = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Requirement {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    complexity: Complexity;
    isRequired: boolean;
    createdAt: string;
    projectId: string;
    versions: RequirementVersion[];
}