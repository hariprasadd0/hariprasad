'use client';

import * as React from 'react';
import { motion, type Transition, type HTMLMotionProps } from 'motion/react';

import {
  Highlight,
  HighlightItem,
  type HighlightItemProps,
  type HighlightProps,
} from '@/components/animate-ui/primitives/effects/highlight';
import { getStrictContext } from '@/lib/get-strict-context';
import { Slot } from '@/components/animate-ui/primitives/animate/slot';

type TabsContextType = {
  activeValue: string;
  handleValueChange: (value: string) => void;
  registerTrigger: (value: string, node: HTMLElement | null) => void;
};

const [TabsProvider, useTabs] =
  getStrictContext<TabsContextType>('TabsContext');

type BaseTabsProps = React.ComponentProps<'div'> & {
  children: React.ReactNode;
};

type UnControlledTabsProps = BaseTabsProps & {
  defaultValue?: string;
  value?: never;
  onValueChange?: never;
};

type ControlledTabsProps = BaseTabsProps & {
  value: string;
  onValueChange?: (value: string) => void;
  defaultValue?: never;
};

type TabsProps = UnControlledTabsProps | ControlledTabsProps;

function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  ...props
}: TabsProps) {
  const [activeValue, setActiveValue] = React.useState<string | undefined>(
    defaultValue,
  );
  const triggersRef = React.useRef(new Map<string, HTMLElement>());
  const initialSet = React.useRef(false);
  const isControlled = value !== undefined;

  React.useEffect(() => {
    if (
      !isControlled &&
      activeValue === undefined &&
      triggersRef.current.size > 0 &&
      !initialSet.current
    ) {
      const firstTab = triggersRef.current.keys().next().value as
        | string
        | undefined;
      if (firstTab !== undefined) {
        setActiveValue(firstTab);
        initialSet.current = true;
      }
    }
  }, [activeValue, isControlled]);

  const registerTrigger = React.useCallback(
    (val: string, node: HTMLElement | null) => {
      if (node) {
        triggersRef.current.set(val, node);
        if (!isControlled && activeValue === undefined && !initialSet.current) {
          setActiveValue(val);
          initialSet.current = true;
        }
      } else {
        triggersRef.current.delete(val);
      }
    },
    [activeValue, isControlled],
  );

  const handleValueChange = React.useCallback(
    (val: string) => {
      if (!isControlled) setActiveValue(val);
      else onValueChange?.(val);
    },
    [isControlled, onValueChange],
  );

  return (
    <TabsProvider
      value={{
        activeValue: (value ?? activeValue) as string,
        handleValueChange,
        registerTrigger,
      }}
    >
      <div data-slot="tabs" {...props}>
        {children}
      </div>
    </TabsProvider>
  );
}

type TabsHighlightProps = Omit<HighlightProps, 'controlledItems' | 'value'>;

function TabsHighlight({
  transition = { type: 'spring', stiffness: 200, damping: 25 },
  ...props
}: TabsHighlightProps) {
  const { activeValue } = useTabs();

  return (
    <Highlight
      data-slot="tabs-highlight"
      controlledItems
      value={activeValue}
      transition={transition}
      click={false}
      {...props}
    />
  );
}

type TabsListProps = React.ComponentProps<'div'> & {
  children: React.ReactNode;
};

function TabsList(props: TabsListProps) {
  return <div role="tablist" data-slot="tabs-list" {...props} />;
}

type TabsHighlightItemProps = HighlightItemProps & {
  value: string;
};

function TabsHighlightItem(props: TabsHighlightItemProps) {
  return <HighlightItem data-slot="tabs-highlight-item" {...props} />;
}

// ✅ Fixed: Use forwardRef and proper typing
type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
  asChild?: boolean;
} & Omit<HTMLMotionProps<'button'>, 'ref'>;

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, asChild = false, ...props }, forwardedRef) => {
    const { activeValue, handleValueChange, registerTrigger } = useTabs();

    const localRef = React.useRef<HTMLButtonElement | null>(null);
    
    // Combine refs
    React.useImperativeHandle(forwardedRef, () => localRef.current!);

    React.useEffect(() => {
      registerTrigger(value, localRef.current);
      return () => registerTrigger(value, null);
    }, [value, registerTrigger]);

    const Component = asChild ? Slot : motion.button;

    return (
      <Component
        ref={localRef}
        data-slot="tabs-trigger"
        role="tab"
        onClick={() => handleValueChange(value)}
        data-state={activeValue === value ? 'active' : 'inactive'}
        {...props}
      />
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

type TabsContentsProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
  transition?: Transition;
};

// ✅ Optimized: Fixed forced reflows
function TabsContents({
  children,
  transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    bounce: 0,
    restDelta: 0.01,
  },
  ...props
}: TabsContentsProps) {
  const { activeValue } = useTabs();
  const childrenArray = React.Children.toArray(children);
  const activeIndex = childrenArray.findIndex(
    (child): child is React.ReactElement<{ value: string }> =>
      React.isValidElement(child) &&
      typeof child.props === 'object' &&
      child.props !== null &&
      'value' in child.props &&
      child.props.value === activeValue,
  );

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [height, setHeight] = React.useState<number | 'auto'>('auto');
  const roRef = React.useRef<ResizeObserver | null>(null);
  
  // ✅ Cache computed styles to avoid repeated getComputedStyle calls
  const cachedStyles = React.useRef<{
    paddingY: number;
    borderY: number;
    isBorderBox: boolean;
  } | null>(null);

  // ✅ Optimized measure function - batches all reads
  const measure = React.useCallback(() => {
    const pane = itemRefs.current[activeIndex];
    const container = containerRef.current;
    if (!pane || !container) return 0;

    // Batch all layout reads together
    const paneRect = pane.getBoundingClientRect();
    
    // Cache computed styles on first call
    if (!cachedStyles.current) {
      const cs = getComputedStyle(container);
      cachedStyles.current = {
        isBorderBox: cs.boxSizing === 'border-box',
        paddingY: parseFloat(cs.paddingTop || '0') + parseFloat(cs.paddingBottom || '0'),
        borderY: parseFloat(cs.borderTopWidth || '0') + parseFloat(cs.borderBottomWidth || '0'),
      };
    }

    const { isBorderBox, paddingY, borderY } = cachedStyles.current;
    let total = paneRect.height + (isBorderBox ? paddingY + borderY : 0);

    // Round to device pixel ratio
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    return Math.ceil(total * dpr) / dpr;
  }, [activeIndex]);

  // ✅ Setup ResizeObserver
  React.useEffect(() => {
    // Clear cached styles when content changes
    cachedStyles.current = null;
    
    if (roRef.current) {
      roRef.current.disconnect();
      roRef.current = null;
    }

    const pane = itemRefs.current[activeIndex];
    const container = containerRef.current;
    if (!pane || !container) return;

    // Initial measurement
    const initialHeight = measure();
    if (initialHeight > 0) {
      setHeight(initialHeight);
    }

    // Setup observer - use contentRect to avoid getBoundingClientRect
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === pane) {
          const newHeight = entry.contentRect.height;
          if (newHeight > 0) {
            requestAnimationFrame(() => setHeight(newHeight));
          }
        }
      }
    });

    ro.observe(pane);
    roRef.current = ro;

    return () => {
      ro.disconnect();
      roRef.current = null;
    };
  }, [activeIndex, childrenArray.length, measure]);

  return (
    <motion.div
      ref={containerRef}
      data-slot="tabs-contents"
      style={{ overflow: 'hidden' }}
      animate={{ height }}
      transition={transition}
      {...props}
    >
      <motion.div
        className="flex -mx-2"
        animate={{ x: activeIndex * -100 + '%' }}
        transition={transition}
      >
        {childrenArray.map((child, index) => (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="w-full shrink-0 px-2 h-full"
          >
            {child}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ✅ Fixed: inert attribute typing
type TabsContentProps = {
  value: string;
  children: React.ReactNode;
  asChild?: boolean;
} & Omit<HTMLMotionProps<'div'>, 'ref'>;

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, style, asChild = false, ...props }, ref) => {
    const { activeValue } = useTabs();
    const isActive = activeValue === value;

    const Component = asChild ? Slot : motion.div;

    return (
      <Component
        ref={ref}
        role="tabpanel"
        data-slot="tabs-content"
        // @ts-ignore - inert is a valid HTML attribute but not in React types yet
        inert={!isActive ? '' : undefined}
        style={{ overflow: 'hidden', ...style }}
        initial={{ filter: 'blur(0px)' }}
        animate={{ filter: isActive ? 'blur(0px)' : 'blur(4px)' }}
        exit={{ filter: 'blur(0px)' }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        {...props}
      />
    );
  }
);

TabsContent.displayName = 'TabsContent';

export {
  Tabs,
  TabsList,
  TabsHighlight,
  TabsHighlightItem,
  TabsTrigger,
  TabsContents,
  TabsContent,
  useTabs,
  type TabsProps,
  type TabsListProps,
  type TabsHighlightProps,
  type TabsHighlightItemProps,
  type TabsTriggerProps,
  type TabsContentsProps,
  type TabsContentProps,
  type TabsContextType,
};