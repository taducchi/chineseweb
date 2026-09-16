'use client';

import { createContext, useContext } from 'react';

const CourseContext = createContext(null);

export function CourseProvider({ children, value }) {
    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
}

export function useCourse() {
    const ctx = useContext(CourseContext);
    if (!ctx) {
        throw new Error('useCourse must be used within a <CourseProvider>');
    }
    return ctx;
}