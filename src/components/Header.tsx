import { useUser } from "@/services/queries.ts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { User } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";

function Header() {
  return (
    <header className="flex w-full sticky top-0 left-0 justify-between px-4 py-4 items-center bg-bg-surface/60  shadow-lg border-b border-border-subtle backdrop-blur-lg z-99999999">
      <div className="inline-flex justify-center items-center gap-2 ">
        <img
          src="/devpulse.webp"
          alt="devpulse logo"
          className="w-10 h-10"
          height={100}
          width={100}
        />
        <p className="text-lg md:text-xl h-min">DevPulse</p>
        <Suspense>
          <PulseText />
        </Suspense>
      </div>
      <div className="text-text-secondary hidden truncate gap-2 justify-center items-center lg:flex">
        <p>Dashboard UI for</p>
        <ErrorBoundary fallback={<> </>}>
          <Suspense
            fallback={
              <Skeleton className="w-30 h-10 rounded-full bg-accent-muted" />
            }
          >
            <HeaderProfileLink />
          </Suspense>
        </ErrorBoundary>
      </div>
      <ErrorBoundary fallback={<HeaderProfileErrorCard />}>
        <Suspense
          fallback={
            <Skeleton
              className={"w-40 md:w-50 h-10 rounded-[22px] bg-accent"}
            />
          }
        >
          <HeaderProfileCard />
        </Suspense>
      </ErrorBoundary>
    </header>
  );
}

export default Header;

function PulseText() {
  const userQuery = useUser();
  const { login } = userQuery.data;
  return (
    <p className="truncate ml-7 hidden md:block">
      {login}'{login.slice(-1) === "s" ? "" : "s"} developer pulse
    </p>
  );
}

function HeaderProfileCard() {
  const userQuery = useUser();
  const { login, avatar_url } = userQuery.data;
  return (
    <a
      href={`https://github.com/${login}`}
      className={
        "inline-flex items-center justify-center gap-3 bg-bg-elevated py-3 px-5 rounded-lg border-border-subtle border-3 max-w-37.5 md:max-w-none"
      }
    >
      <Avatar className={"rounded-sm text-lg"}>
        <AvatarImage src={avatar_url} alt={login} />
        <AvatarFallback
          className={
            "bg-text-primary text-bg-base text-lg! rounded-sm px-[0.45rem]"
          }
        >
          <User height={32} width={32} className={"text-text-secondary"}></User>
        </AvatarFallback>
      </Avatar>
      <p className="hidden md:block">
        <span className="hidden lg:block">View Github Profile</span>
        <span className={"block lg:hidden text-ellipsis"}>{login}</span>
      </p>
    </a>
  );
}
function HeaderProfileErrorCard() {
  return (
    <a
      className={
        "inline-flex items-center justify-center gap-3 bg-bg-elevated py-3 px-5 rounded-lg border-border-subtle border-3 max-w-37.5 md:max-w-none"
      }
    >
      <Avatar className={"rounded-sm text-lg"}>
        <AvatarFallback
          className={
            "bg-text-primary text-bg-base text-lg! rounded-sm px-[0.45rem]"
          }
        >
          <User height={32} width={32} className={"text-text-secondary"}></User>
        </AvatarFallback>
      </Avatar>
    </a>
  );
}

function HeaderProfileLink() {
  const userQuery = useUser();
  const { login } = userQuery.data;
  return (
    <a className="text-accent" href={`https://github.com/${login}`}>
      {login}
    </a>
  );
}
