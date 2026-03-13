import { Component, ReactNode } from "react";
import GitHubCalendar from "react-github-calendar";

interface GithubChartProps {
  isDarkMode: boolean;
}

class GithubCalErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export const GithubChart: React.FC<GithubChartProps> = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear()
  return (
    <GithubCalErrorBoundary>
      <section className=" max-w-xl mx-16  px-0 pt-5 pb-5">
        <div className="w-full overflow-hidden">
          <div className="w-full min-w-[300px] max-w-full overflow-x-hidden">
            <div className="min-w-[600px] sm:min-w-0">
              <GitHubCalendar
                username="hariprasadd0"
                colorScheme={isDarkMode ? "dark" : "light"}
                hideTotalCount={false}
                hideColorLegend={true}
                year={currentYear}
                throwOnError
                labels={{
                  totalCount: "Contributions - [{{count}}]",
                }}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                }}
theme={{
  light: [
    "hsl(var(--muted) / 0.4)",   // level 0
    "hsl(var(--primary) / 0.25)",
    "hsl(var(--primary) / 0.45)",
    "hsl(var(--primary) / 0.65)",
    "hsl(var(--primary) / 0.85)"
  ],
  dark: [
    "hsl(var(--muted) / 0.25)",  // level 0
    "hsl(var(--primary) / 0.35)",
    "hsl(var(--primary) / 0.55)",
    "hsl(var(--primary) / 0.75)",
    "hsl(var(--primary) / 0.95)"
  ]
}}
                
              />
            </div>
          </div>
        </div>
      </section>
    </GithubCalErrorBoundary>
  );
};
