const AppErrorComponent = ({ title }: { title: string }): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-5 px-5 py-20 text-6xl text-white/80 md:text-7xl lg:text-8xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 24 24"
      >
        <g stroke="currentColor" stroke-linecap="round" stroke-width="2">
          <path
            fill="currentColor"
            fillOpacity="0"
            stroke-dasharray="60"
            stroke-dashoffset="60"
            d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.5s"
              values="60;0"
            ></animate>
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="1.2s"
              dur="0.15s"
              values="0;0.3"
            ></animate>
          </path>
          <path
            fill="none"
            stroke-dasharray="14"
            stroke-dashoffset="14"
            d="M8 16C8.5 15 9.79086 14 12 14C14.2091 14 15.5 15 16 16"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1s"
              dur="0.2s"
              values="14;0"
            ></animate>
          </path>
        </g>
        <g fill="currentColor" fillOpacity="0">
          <ellipse cx="9" cy="9.5" rx="1" ry="1.5">
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.6s"
              dur="0.2s"
              values="0;1"
            ></animate>
          </ellipse>
          <ellipse cx="15" cy="9.5" rx="1" ry="1.5">
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.8s"
              dur="0.2s"
              values="0;1"
            ></animate>
          </ellipse>
        </g>
      </svg>

      <p className="text-center text-lg font-semibold sm:text-xl">{title}</p>
    </div>
  );
};

export default AppErrorComponent;
