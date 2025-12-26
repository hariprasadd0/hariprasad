import React from 'react';
import Shell from "@/components/shell";
import CompilerDemo from "@/components/blog/CompilerDemo";
import TraceDemo from "@/components/blog/TraceDemo";

// Define the signature for blog components
// They might receive children or other props passed from the markdown parser
type BlogComponent = React.ComponentType<any>;

export const BLOG_COMPONENT_MAP: Record<string, BlogComponent> = {
  "COMPILE": CompilerDemo,
  "TRACE": TraceDemo,
  "TIP": Shell,
};

export const getComponentForTag = (tag: string): BlogComponent | undefined => {
  return BLOG_COMPONENT_MAP[tag];
};
