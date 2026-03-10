export type Snippet = {
  id: string;
  title: string;
  language: string;
  code: string;
  isPublic: boolean;
  tags: string[];
  createdAt: string;
  ownerId: string;
};

export const MOCK_USER_ID = "user_123";

export const mockSnippets: Snippet[] = [
  {
    id: "1",
    title: "React Debounce Hook",
    language: "TypeScript",
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}`,
    isPublic: true,
    tags: ["react", "hooks", "performance"],
    createdAt: "2023-10-01T12:00:00Z",
    ownerId: MOCK_USER_ID,
  },
  {
    id: "2",
    title: "Center a Div",
    language: "CSS",
    code: `.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`,
    isPublic: true,
    tags: ["css", "layout"],
    createdAt: "2023-10-02T15:30:00Z",
    ownerId: "other_user",
  },
  {
    id: "3",
    title: "Rust File Reader",
    language: "Rust",
    code: `use std::fs;

fn read_file(path: &str) -> Result<String, std::io::Error> {
    let content = fs::read_to_string(path)?;
    Ok(content)
}`,
    isPublic: false,
    tags: ["rust", "io"],
    createdAt: "2023-10-05T09:15:00Z",
    ownerId: MOCK_USER_ID,
  }
];
