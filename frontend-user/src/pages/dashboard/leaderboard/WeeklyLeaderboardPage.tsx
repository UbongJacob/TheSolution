import { getLeaderboard } from "@/api/payments.api";
import ScrollProgress from "@/components/ScrollProgress";
import { useAppTranslator } from "@/hooks/useAppTranslator";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import LeaderboardData from "./components/LeaderboardData";
import SpinnerIcon from "@/components/icons/SpinnerIcon";

const pageValues = ["WEEKLY TIPS", "No weekly tip available"] as const;

type PageValuesType = {
  [k in (typeof pageValues)[number]]: string;
};

const pageValuesObject = pageValues.reduce((acc, value) => {
  return { ...acc, [value]: value };
}, {});

const WeeklyLeaderboardPage = (): JSX.Element => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const { translatedValues } = useAppTranslator<PageValuesType>({
    ...pageValuesObject,
  });

  const { fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, data } =
    useInfiniteQuery({
      initialPageParam: "",
      queryKey: ["getWeeklyLeaderboard"],
      queryFn: ({ pageParam }) =>
        getLeaderboard({ cursor: pageParam, duration: "WEEKLY" }),
      getNextPageParam: (lastPage) => lastPage?.metadata?.cursor?.afterCursor,
    });

  if (scrollProgress > 80 && hasNextPage && !isFetching) {
    fetchNextPage();
  }
  return (
    <section className="overflow-hidden  rounded-2xl bg-appDarkBlue700">
      {/* {timeLeft} */}
      <ScrollProgress
        onScrollProgress={(value) => setScrollProgress(value)}
        className=" h-full max-h-[73vh] overflow-y-auto p-4 md:p-5 lg:p-6"
      >
        <LeaderboardData
          title={translatedValues?.["WEEKLY TIPS"]}
          data={data}
          emptyDataMessage={translatedValues?.["No weekly tip available"]}
        />
        <div>
          {isFetchingNextPage && <SpinnerIcon className="pagination-loader" />}
        </div>
      </ScrollProgress>
    </section>
  );
};

export default WeeklyLeaderboardPage;
