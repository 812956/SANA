
import React, { createContext, useContext, useState } from 'react';

type ToolCallback = (params: any) => void;

interface SantaAIContextType {
    registerTool: (name: string, callback: ToolCallback) => void;
    unregisterTool: (name: string) => void;
    executeTool: (name: string, params: any) => boolean;
    activeTools: string[];
}

const SantaAIContext = createContext<SantaAIContextType | undefined>(undefined);

export const SantaAIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tools, setTools] = useState<Record<string, ToolCallback>>({});

    const registerTool = (name: string, callback: ToolCallback) => {
        setTools(prev => ({ ...prev, [name]: callback }));
        console.log(`[SantaAI] Tool registered: ${name}`);
    };

    const unregisterTool = (name: string) => {
        setTools(prev => {
            const next = { ...prev };
            delete next[name];
            return next;
        });
        console.log(`[SantaAI] Tool unregistered: ${name}`);
    };

    const executeTool = (name: string, params: any): boolean => {
        const tool = tools[name];
        if (tool) {
            console.log(`[SantaAI] Executing tool: ${name}`, params);
            tool(params);
            return true;
        }
        console.warn(`[SantaAI] Tool not found: ${name}`);
        console.warn(`[SantaAI] Available tools:`, Object.keys(tools));
        console.warn(`[SantaAI] Total registered tools: ${Object.keys(tools).length}`);
        return false;
    };

    return (
        <SantaAIContext.Provider value={{
            registerTool,
            unregisterTool,
            executeTool,
            activeTools: Object.keys(tools)
        }}>
            {children}
        </SantaAIContext.Provider>
    );
};

export const useSantaAI = () => {
    const context = useContext(SantaAIContext);
    if (!context) {
        throw new Error('useSantaAI must be used within a SantaAIProvider');
    }
    return context;
};
