export interface Elf {
    id: string;
    agentId: string;
    name: string;
    level: number;
    title: string;
    department: string;
    avatarUrl: string;
    password: string;
    points: number;
    badges: string[];
    status: 'ONLINE' | 'OFFLINE' | 'BUSY' | 'ACTIVE' | 'TERMINATED'; // status in DB is String, usually mapped
    email?: string; // Not in schema, might be removed or optional
    joinedDate?: string; // Schema has createdAt
    workLogs?: WorkLog[]; // Schema relation
}

export interface WorkLog {
    id: string;
    action: string;
    description: string;
    pointsEarned: number;
    timestamp: string;
}

export interface WorkHistoryEvent {
    id: string;
    date: string;
    action: string;
    details: string;
    type: 'PROMOTION' | 'ACHIEVEMENT' | 'INFRACTION' | 'ROUTINE';
}

export interface Workbench {
    id: string;
    name: string;
    status: 'IDLE' | 'DESIGNING' | 'ASSEMBLING' | 'PAINTING' | 'QA' | 'WRAPPING';
    currentToy: string | null;
    progress: number; // 0-100
    efficiency: number; // multiplier
}

export interface SantaSystemStats {
    toysProduced: number;
    coalStockpiled: number;
    pendingOrders: number;
    activeElves: number;
    sleighBattery: number;
    workbenches: Workbench[];
    serverLoad?: string;
    niceScore?: number;
}
