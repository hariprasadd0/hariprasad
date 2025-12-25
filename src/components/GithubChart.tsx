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
  return (
    <GithubCalErrorBoundary>
      <section className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-0 pt-5 pb-5">
        <div className="w-full overflow-hidden">
          <div className="w-full min-w-[300px] max-w-full overflow-x-auto">
            <div className="min-w-[600px] sm:min-w-0">
              <GitHubCalendar
                username="hariprasadd0"
                colorScheme={isDarkMode ? "dark" : "light"}
                hideTotalCount={false}
                hideColorLegend={true}
                throwOnError
                labels={{
                  totalCount: "Contributions - [{{count}}]",
                }}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </GithubCalErrorBoundary>
  );
};
