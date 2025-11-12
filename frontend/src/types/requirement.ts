export type Priority = 'Low' | 'Medium' | 'High';
export type Complexity = 'Low' | 'Medium' | 'High';

export interface Requirement {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    complexity: Complexity;
    createdAt: string;
    projectId: number;
}