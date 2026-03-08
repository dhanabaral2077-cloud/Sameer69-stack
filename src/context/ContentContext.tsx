import React, { createContext, useContext } from 'react';
import schema from '../content/schema.json';

type SchemaType = typeof schema;

interface ContentContextType {
    content: SchemaType['content'];
    theme: SchemaType['theme'];
    sections: SchemaType['sections'];
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ContentContext.Provider value={{
            content: schema.content,
            theme: schema.theme,
            sections: schema.sections,
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) throw new Error('useContent must be used within a ContentProvider');
    return context;
};
